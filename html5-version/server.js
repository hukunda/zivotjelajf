const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cron = require('node-cron');
const axios = require('axios');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'zivot-je-lajf-secret-key-2024';

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false // Allow inline styles for now
}));
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Serve static files
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use('/admin', express.static('admin/dist'));

// Create uploads directory
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
    fs.mkdirSync('uploads/bands');
    fs.mkdirSync('uploads/vinyls');
    fs.mkdirSync('uploads/events');
}

// Database setup
const db = new sqlite3.Database('zivot_cms.db');

// Initialize database
db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT,
        role TEXT DEFAULT 'admin',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Bands table
    db.run(`CREATE TABLE IF NOT EXISTS bands (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        short_description TEXT,
        long_description TEXT,
        image TEXT,
        booking_url TEXT,
        website_url TEXT,
        facebook_url TEXT,
        instagram_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Vinyls table
    db.run(`CREATE TABLE IF NOT EXISTS vinyls (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        band_id INTEGER,
        description TEXT,
        price INTEGER,
        stock INTEGER DEFAULT 0,
        image TEXT,
        bandcamp_url TEXT,
        apple_music_url TEXT,
        spotify_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (band_id) REFERENCES bands (id)
    )`);

    // Events table
    db.run(`CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        band_id INTEGER,
        date TEXT NOT NULL,
        time TEXT,
        venue TEXT,
        price TEXT,
        tickets_url TEXT,
        website_url TEXT,
        facebook_url TEXT,
        instagram_url TEXT,
        image TEXT,
        google_event_id TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (band_id) REFERENCES bands (id)
    )`);

    // News table
    db.run(`CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT,
        excerpt TEXT,
        author TEXT DEFAULT 'Lajf',
        image TEXT,
        published BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Email subscriptions table
    db.run(`CREATE TABLE IF NOT EXISTS email_subscriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Orders table
    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        customer_phone TEXT,
        customer_address TEXT,
        vinyl_id INTEGER,
        quantity INTEGER DEFAULT 1,
        total_price INTEGER,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (vinyl_id) REFERENCES vinyls (id)
    )`);

    // Settings table
    db.run(`CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Create default admin user
    const defaultPassword = bcrypt.hashSync('admin123', 10);
    db.run(`INSERT OR IGNORE INTO users (username, password, email) VALUES (?, ?, ?)`, 
        ['admin', defaultPassword, 'cau@zivotjelajf.com']);

    // Insert default settings
    const defaultSettings = [
        ['site_title', 'ŽIVOT JE LAJF'],
        ['site_phone', '+420 727 273 372'],
        ['site_email', 'cau@zivotjelajf.com'],
        ['facebook_url', ''],
        ['instagram_url', ''],
        ['twitter_url', ''],
        ['google_calendar_api_key', ''],
        ['google_calendar_id', ''],
        ['music_player_enabled', '0'],
        ['music_player_type', 'bandcamp'],
        ['music_player_url', ''],
        ['music_player_track_title', ''],
        ['music_player_track_artist', ''],
        ['music_player_artwork_url', '']
    ];

    defaultSettings.forEach(([key, value]) => {
        db.run(`INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)`, [key, value]);
    });
});

// File upload configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folder = req.body.type || 'general';
        const uploadPath = `uploads/${folder}`;
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// API Routes

// Authentication
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    });
});

// Bands API
app.get('/api/bands', (req, res) => {
    db.all('SELECT * FROM bands ORDER BY name', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.get('/api/bands/:id', (req, res) => {
    db.get('SELECT * FROM bands WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Band not found' });
        }
        res.json(row);
    });
});

app.post('/api/bands', authenticateToken, upload.single('image'), (req, res) => {
    const { name, short_description, long_description, booking_url, website_url, facebook_url, instagram_url } = req.body;
    const image = req.file ? `/uploads/bands/${req.file.filename}` : null;
    
    db.run(`INSERT INTO bands (name, short_description, long_description, image, booking_url, website_url, facebook_url, instagram_url) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, short_description, long_description, image, booking_url, website_url, facebook_url, instagram_url],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID, message: 'Band created successfully' });
        });
});

app.put('/api/bands/:id', authenticateToken, upload.single('image'), (req, res) => {
    const { name, short_description, long_description, booking_url, website_url, facebook_url, instagram_url } = req.body;
    const image = req.file ? `/uploads/bands/${req.file.filename}` : undefined;
    
    let query = `UPDATE bands SET name = ?, short_description = ?, long_description = ?, booking_url = ?, website_url = ?, facebook_url = ?, instagram_url = ?, updated_at = CURRENT_TIMESTAMP`;
    let params = [name, short_description, long_description, booking_url, website_url, facebook_url, instagram_url];
    
    if (image) {
        query += `, image = ?`;
        params.push(image);
    }
    
    query += ` WHERE id = ?`;
    params.push(req.params.id);
    
    db.run(query, params, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Band updated successfully' });
    });
});

app.delete('/api/bands/:id', authenticateToken, (req, res) => {
    db.run('DELETE FROM bands WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Band deleted successfully' });
    });
});

// Vinyls API
app.get('/api/vinyls', (req, res) => {
    db.all(`SELECT v.*, b.name as band_name FROM vinyls v 
            LEFT JOIN bands b ON v.band_id = b.id 
            ORDER BY v.created_at DESC`, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.get('/api/vinyls/:id', (req, res) => {
    db.get(`SELECT v.*, b.name as band_name FROM vinyls v 
            LEFT JOIN bands b ON v.band_id = b.id 
            WHERE v.id = ?`, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Vinyl not found' });
        }
        res.json(row);
    });
});

app.post('/api/vinyls', authenticateToken, upload.single('image'), (req, res) => {
    const { title, band_id, description, price, stock, bandcamp_url, apple_music_url, spotify_url } = req.body;
    const image = req.file ? `/uploads/vinyls/${req.file.filename}` : null;
    
    db.run(`INSERT INTO vinyls (title, band_id, description, price, stock, image, bandcamp_url, apple_music_url, spotify_url) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [title, band_id, description, price, stock, image, bandcamp_url, apple_music_url, spotify_url],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID, message: 'Vinyl created successfully' });
        });
});

app.put('/api/vinyls/:id', authenticateToken, upload.single('image'), (req, res) => {
    const { title, band_id, description, price, stock, bandcamp_url, apple_music_url, spotify_url } = req.body;
    const image = req.file ? `/uploads/vinyls/${req.file.filename}` : undefined;
    
    let query = `UPDATE vinyls SET title = ?, band_id = ?, description = ?, price = ?, stock = ?, bandcamp_url = ?, apple_music_url = ?, spotify_url = ?, updated_at = CURRENT_TIMESTAMP`;
    let params = [title, band_id, description, price, stock, bandcamp_url, apple_music_url, spotify_url];
    
    if (image) {
        query += `, image = ?`;
        params.push(image);
    }
    
    query += ` WHERE id = ?`;
    params.push(req.params.id);
    
    db.run(query, params, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Vinyl updated successfully' });
    });
});

app.delete('/api/vinyls/:id', authenticateToken, (req, res) => {
    db.run('DELETE FROM vinyls WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Vinyl deleted successfully' });
    });
});

// Events API
app.get('/api/events', (req, res) => {
    const upcoming = req.query.upcoming === 'true';
    let query = `SELECT e.*, b.name as band_name FROM events e 
                 LEFT JOIN bands b ON e.band_id = b.id`;
    
    if (upcoming) {
        query += ` WHERE e.date >= date('now') ORDER BY e.date ASC`;
    } else {
        query += ` ORDER BY e.date DESC`;
    }
    
    db.all(query, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.get('/api/events/:id', (req, res) => {
    db.get(`SELECT e.*, b.name as band_name FROM events e 
            LEFT JOIN bands b ON e.band_id = b.id 
            WHERE e.id = ?`, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(row);
    });
});

app.post('/api/events', authenticateToken, upload.single('image'), (req, res) => {
    const { title, band_id, date, time, venue, price, tickets_url, website_url, facebook_url, instagram_url } = req.body;
    const image = req.file ? `/uploads/events/${req.file.filename}` : null;
    
    db.run(`INSERT INTO events (title, band_id, date, time, venue, price, tickets_url, website_url, facebook_url, instagram_url, image) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [title, band_id, date, time, venue, price, tickets_url, website_url, facebook_url, instagram_url, image],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID, message: 'Event created successfully' });
        });
});

app.put('/api/events/:id', authenticateToken, upload.single('image'), (req, res) => {
    const { title, band_id, date, time, venue, price, tickets_url, website_url, facebook_url, instagram_url } = req.body;
    const image = req.file ? `/uploads/events/${req.file.filename}` : undefined;
    
    let query = `UPDATE events SET title = ?, band_id = ?, date = ?, time = ?, venue = ?, price = ?, tickets_url = ?, website_url = ?, facebook_url = ?, instagram_url = ?, updated_at = CURRENT_TIMESTAMP`;
    let params = [title, band_id, date, time, venue, price, tickets_url, website_url, facebook_url, instagram_url];
    
    if (image) {
        query += `, image = ?`;
        params.push(image);
    }
    
    query += ` WHERE id = ?`;
    params.push(req.params.id);
    
    db.run(query, params, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Event updated successfully' });
    });
});

app.delete('/api/events/:id', authenticateToken, (req, res) => {
    db.run('DELETE FROM events WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Event deleted successfully' });
    });
});

// News API
app.get('/api/news', (req, res) => {
    const published = req.query.published !== 'false';
    let query = 'SELECT * FROM news';
    
    if (published) {
        query += ' WHERE published = 1';
    }
    
    query += ' ORDER BY created_at DESC';
    
    db.all(query, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.post('/api/news', authenticateToken, upload.single('image'), (req, res) => {
    const { title, content, excerpt, author, published } = req.body;
    const image = req.file ? `/uploads/news/${req.file.filename}` : null;
    
    db.run(`INSERT INTO news (title, content, excerpt, author, image, published) 
            VALUES (?, ?, ?, ?, ?, ?)`,
        [title, content, excerpt, author || 'Lajf', image, published ? 1 : 0],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID, message: 'News article created successfully' });
        });
});

// Email subscription
app.post('/api/subscribe', (req, res) => {
    const { email } = req.body;
    
    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Valid email required' });
    }
    
    db.run('INSERT OR IGNORE INTO email_subscriptions (email) VALUES (?)', [email], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        // Send notification email (optional)
        // You can configure nodemailer here
        
        res.json({ message: 'Successfully subscribed!' });
    });
});

// Orders API
app.post('/api/orders', (req, res) => {
    const { vinyl_id, customer_name, customer_email, customer_phone, customer_address, quantity } = req.body;
    
    // Get vinyl price
    db.get('SELECT price FROM vinyls WHERE id = ?', [vinyl_id], (err, vinyl) => {
        if (err || !vinyl) {
            return res.status(400).json({ error: 'Vinyl not found' });
        }
        
        const total_price = vinyl.price * quantity;
        
        db.run(`INSERT INTO orders (vinyl_id, customer_name, customer_email, customer_phone, customer_address, quantity, total_price) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [vinyl_id, customer_name, customer_email, customer_phone, customer_address, quantity, total_price],
            function(err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                
                // Update vinyl stock
                db.run('UPDATE vinyls SET stock = stock - ? WHERE id = ?', [quantity, vinyl_id]);
                
                res.json({ 
                    id: this.lastID, 
                    message: 'Order placed successfully',
                    total_price: total_price
                });
            });
    });
});

app.get('/api/orders', authenticateToken, (req, res) => {
    db.all(`SELECT o.*, v.title as vinyl_title, v.image as vinyl_image 
            FROM orders o 
            LEFT JOIN vinyls v ON o.vinyl_id = v.id 
            ORDER BY o.created_at DESC`, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Settings API
app.get('/api/settings', (req, res) => {
    db.all('SELECT * FROM settings', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        const settings = {};
        rows.forEach(row => {
            settings[row.key] = row.value;
        });
        
        res.json(settings);
    });
});

app.put('/api/settings', authenticateToken, (req, res) => {
    const settings = req.body;
    
    const updates = Object.entries(settings).map(([key, value]) => {
        return new Promise((resolve, reject) => {
            db.run('INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)', 
                [key, value], (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    });
    
    Promise.all(updates)
        .then(() => res.json({ message: 'Settings updated successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
});

// File upload endpoint
app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const folder = req.body.type || 'general';
    const fileUrl = `/uploads/${folder}/${req.file.filename}`;
    
    res.json({ 
        url: fileUrl,
        filename: req.file.filename,
        originalName: req.file.originalname
    });
});

// Google Calendar sync (scheduled job)
cron.schedule('0 * * * *', async () => { // Every hour
    try {
        const settings = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM settings WHERE key IN (?, ?)', 
                ['google_calendar_api_key', 'google_calendar_id'], 
                (err, rows) => {
                    if (err) reject(err);
                    else {
                        const settingsObj = {};
                        rows.forEach(row => settingsObj[row.key] = row.value);
                        resolve(settingsObj);
                    }
                });
        });
        
        if (settings.google_calendar_api_key && settings.google_calendar_id) {
            // Sync with Google Calendar
            // Implementation would go here
            console.log('Google Calendar sync scheduled');
        }
    } catch (error) {
        console.error('Calendar sync error:', error);
    }
});

// Serve admin panel
app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin/dist/index.html'));
});

// Serve main website
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Error handling
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File too large' });
        }
    }
    
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🎸 Život je lajf CMS running on http://localhost:${PORT}`);
    console.log(`📱 Admin panel: http://localhost:${PORT}/admin`);
    console.log(`🎵 Default login: admin / admin123`);
});

module.exports = app;
