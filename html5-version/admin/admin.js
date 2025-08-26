// Global variables
let authToken = localStorage.getItem('auth_token');
let currentSection = 'dashboard';

// API Base URL
const API_BASE = window.location.origin + '/api';

// Initialize admin
document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
});

// Initialize Admin
function initializeAdmin() {
    if (authToken) {
        showAdminLayout();
        loadSection('dashboard');
    } else {
        showLoginForm();
    }
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize login form
    initializeLoginForm();
}

// Show Login Form
function showLoginForm() {
    document.getElementById('login-container').classList.remove('hidden');
    document.getElementById('admin-layout').classList.add('hidden');
}

// Show Admin Layout
function showAdminLayout() {
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('admin-layout').classList.remove('hidden');
}

// Initialize Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Load section
            loadSection(section);
        });
    });
}

// Initialize Login Form
function initializeLoginForm() {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const messageEl = document.getElementById('login-message');
        const btnText = document.getElementById('login-btn-text');
        const loading = document.getElementById('login-loading');
        
        // Show loading
        btnText.classList.add('hidden');
        loading.classList.remove('hidden');
        
        try {
            const response = await fetch(`${API_BASE}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            
            const result = await response.json();
            
            if (response.ok) {
                authToken = result.token;
                localStorage.setItem('auth_token', authToken);
                showAdminLayout();
                loadSection('dashboard');
            } else {
                showMessage(messageEl, result.error || 'Chyba při přihlášení', 'error');
            }
        } catch (error) {
            showMessage(messageEl, 'Chyba spojení se serverem', 'error');
        } finally {
            // Hide loading
            btnText.classList.remove('hidden');
            loading.classList.add('hidden');
        }
    });
}

// Logout
function logout() {
    authToken = null;
    localStorage.removeItem('auth_token');
    showLoginForm();
}

// Load Section
async function loadSection(section) {
    currentSection = section;
    const contentArea = document.getElementById('content-area');
    const mainTitle = document.getElementById('main-title');
    
    // Update title
    const titles = {
        dashboard: 'Dashboard',
        bands: 'Kapely',
        vinyls: 'Vinyly',
        events: 'Koncerty',
        news: 'Novinky',
        orders: 'Objednávky',
        subscriptions: 'Email registrace',
        settings: 'Základní nastavení',
        'music-player': 'Music Player'
    };
    
    mainTitle.textContent = titles[section] || section;
    
    // Load content
    switch(section) {
        case 'dashboard':
            await loadDashboard();
            break;
        case 'bands':
            await loadBands();
            break;
        case 'vinyls':
            await loadVinyls();
            break;
        case 'events':
            await loadEvents();
            break;
        case 'news':
            await loadNews();
            break;
        case 'orders':
            await loadOrders();
            break;
        case 'subscriptions':
            await loadSubscriptions();
            break;
        case 'settings':
            await loadSettings();
            break;
        case 'music-player':
            await loadMusicPlayerSettings();
            break;
        default:
            contentArea.innerHTML = '<div class="card"><h2>Sekce nenalezena</h2></div>';
    }
}

// Load Dashboard
async function loadDashboard() {
    const contentArea = document.getElementById('content-area');
    
    try {
        // Fetch stats
        const [bandsRes, vinylsRes, eventsRes, ordersRes] = await Promise.all([
            fetch(`${API_BASE}/bands`, { headers: getAuthHeaders() }),
            fetch(`${API_BASE}/vinyls`, { headers: getAuthHeaders() }),
            fetch(`${API_BASE}/events`, { headers: getAuthHeaders() }),
            fetch(`${API_BASE}/orders`, { headers: getAuthHeaders() })
        ]);
        
        const bands = await bandsRes.json();
        const vinyls = await vinylsRes.json();
        const events = await eventsRes.json();
        const orders = await ordersRes.json();
        
        contentArea.innerHTML = `
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number">${bands.length}</div>
                    <div class="stat-label">Kapely</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${vinyls.length}</div>
                    <div class="stat-label">Vinyly</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${events.length}</div>
                    <div class="stat-label">Koncerty</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${orders.length}</div>
                    <div class="stat-label">Objednávky</div>
                </div>
            </div>
            
            <div class="grid grid-2">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Nejnovější objednávky</h3>
                    </div>
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Zákazník</th>
                                    <th>Vinyl</th>
                                    <th>Cena</th>
                                    <th>Stav</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${orders.slice(0, 5).map(order => `
                                    <tr>
                                        <td>${escapeHtml(order.customer_name)}</td>
                                        <td>${escapeHtml(order.vinyl_title || 'N/A')}</td>
                                        <td>${order.total_price} Kč</td>
                                        <td><span class="status-badge status-${order.status}">${order.status}</span></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Nadcházející koncerty</h3>
                    </div>
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Datum</th>
                                    <th>Kapela</th>
                                    <th>Místo</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${events.filter(e => new Date(e.date) >= new Date()).slice(0, 5).map(event => `
                                    <tr>
                                        <td>${formatDate(event.date)}</td>
                                        <td>${escapeHtml(event.band_name || event.title)}</td>
                                        <td>${escapeHtml(event.venue)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        contentArea.innerHTML = `
            <div class="message message-error">
                Chyba při načítání dashboardu: ${error.message}
            </div>
        `;
    }
}

// Load Bands
async function loadBands() {
    const contentArea = document.getElementById('content-area');
    
    try {
        const response = await fetch(`${API_BASE}/bands`, { headers: getAuthHeaders() });
        const bands = await response.json();
        
        contentArea.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Kapely</h3>
                    <button class="btn btn-primary" onclick="openEditModal('band')">Přidat kapelu</button>
                </div>
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Název</th>
                                <th>Krátký popis</th>
                                <th>Obrázek</th>
                                <th>Akce</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${bands.map(band => `
                                <tr>
                                    <td><strong>${escapeHtml(band.name)}</strong></td>
                                    <td>${escapeHtml(band.short_description || '')}</td>
                                    <td>${band.image ? '✅' : '❌'}</td>
                                    <td>
                                        <button class="btn btn-secondary btn-small" onclick="openEditModal('band', ${band.id})">Upravit</button>
                                        <button class="btn btn-danger btn-small" onclick="deleteItem('band', ${band.id})">Smazat</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } catch (error) {
        contentArea.innerHTML = `<div class="message message-error">Chyba při načítání kapel: ${error.message}</div>`;
    }
}

// Load Vinyls
async function loadVinyls() {
    const contentArea = document.getElementById('content-area');
    
    try {
        const response = await fetch(`${API_BASE}/vinyls`, { headers: getAuthHeaders() });
        const vinyls = await response.json();
        
        contentArea.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Vinyly</h3>
                    <button class="btn btn-primary" onclick="openEditModal('vinyl')">Přidat vinyl</button>
                </div>
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Název</th>
                                <th>Kapela</th>
                                <th>Cena</th>
                                <th>Skladem</th>
                                <th>Obrázek</th>
                                <th>Akce</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${vinyls.map(vinyl => `
                                <tr>
                                    <td><strong>${escapeHtml(vinyl.title)}</strong></td>
                                    <td>${escapeHtml(vinyl.band_name || '')}</td>
                                    <td>${vinyl.price ? vinyl.price + ' Kč' : '-'}</td>
                                    <td>${vinyl.stock || 0}</td>
                                    <td>${vinyl.image ? '✅' : '❌'}</td>
                                    <td>
                                        <button class="btn btn-secondary btn-small" onclick="openEditModal('vinyl', ${vinyl.id})">Upravit</button>
                                        <button class="btn btn-danger btn-small" onclick="deleteItem('vinyl', ${vinyl.id})">Smazat</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } catch (error) {
        contentArea.innerHTML = `<div class="message message-error">Chyba při načítání vinylů: ${error.message}</div>`;
    }
}

// Load Events
async function loadEvents() {
    const contentArea = document.getElementById('content-area');
    
    try {
        const response = await fetch(`${API_BASE}/events`, { headers: getAuthHeaders() });
        const events = await response.json();
        
        contentArea.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Koncerty</h3>
                    <button class="btn btn-primary" onclick="openEditModal('event')">Přidat koncert</button>
                </div>
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Datum</th>
                                <th>Název</th>
                                <th>Kapela</th>
                                <th>Místo</th>
                                <th>Cena</th>
                                <th>Akce</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${events.map(event => `
                                <tr>
                                    <td>${formatDate(event.date)}</td>
                                    <td><strong>${escapeHtml(event.title)}</strong></td>
                                    <td>${escapeHtml(event.band_name || '')}</td>
                                    <td>${escapeHtml(event.venue)}</td>
                                    <td>${escapeHtml(event.price || '-')}</td>
                                    <td>
                                        <button class="btn btn-secondary btn-small" onclick="openEditModal('event', ${event.id})">Upravit</button>
                                        <button class="btn btn-danger btn-small" onclick="deleteItem('event', ${event.id})">Smazat</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } catch (error) {
        contentArea.innerHTML = `<div class="message message-error">Chyba při načítání koncertů: ${error.message}</div>`;
    }
}

// Load News
async function loadNews() {
    const contentArea = document.getElementById('content-area');
    
    try {
        const response = await fetch(`${API_BASE}/news?published=false`, { headers: getAuthHeaders() });
        const news = await response.json();
        
        contentArea.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Novinky</h3>
                    <button class="btn btn-primary" onclick="openEditModal('news')">Přidat novinku</button>
                </div>
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Název</th>
                                <th>Autor</th>
                                <th>Datum</th>
                                <th>Stav</th>
                                <th>Akce</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${news.map(article => `
                                <tr>
                                    <td><strong>${escapeHtml(article.title)}</strong></td>
                                    <td>${escapeHtml(article.author)}</td>
                                    <td>${formatDate(article.created_at)}</td>
                                    <td><span class="status-badge status-${article.published ? 'published' : 'draft'}">${article.published ? 'Publikováno' : 'Koncept'}</span></td>
                                    <td>
                                        <button class="btn btn-secondary btn-small" onclick="openEditModal('news', ${article.id})">Upravit</button>
                                        <button class="btn btn-danger btn-small" onclick="deleteItem('news', ${article.id})">Smazat</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } catch (error) {
        contentArea.innerHTML = `<div class="message message-error">Chyba při načítání novinek: ${error.message}</div>`;
    }
}

// Load Orders
async function loadOrders() {
    const contentArea = document.getElementById('content-area');
    
    try {
        const response = await fetch(`${API_BASE}/orders`, { headers: getAuthHeaders() });
        const orders = await response.json();
        
        contentArea.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Objednávky</h3>
                </div>
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Zákazník</th>
                                <th>Email</th>
                                <th>Vinyl</th>
                                <th>Počet</th>
                                <th>Cena</th>
                                <th>Stav</th>
                                <th>Datum</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orders.map(order => `
                                <tr>
                                    <td>#${order.id}</td>
                                    <td>${escapeHtml(order.customer_name)}</td>
                                    <td><a href="mailto:${escapeHtml(order.customer_email)}">${escapeHtml(order.customer_email)}</a></td>
                                    <td>${escapeHtml(order.vinyl_title || 'N/A')}</td>
                                    <td>${order.quantity}</td>
                                    <td>${order.total_price} Kč</td>
                                    <td><span class="status-badge status-${order.status}">${order.status}</span></td>
                                    <td>${formatDate(order.created_at)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } catch (error) {
        contentArea.innerHTML = `<div class="message message-error">Chyba při načítání objednávek: ${error.message}</div>`;
    }
}

// Load Subscriptions
async function loadSubscriptions() {
    const contentArea = document.getElementById('content-area');
    
    try {
        const response = await fetch(`${API_BASE}/subscriptions`, { headers: getAuthHeaders() });
        const subscriptions = await response.json();
        
        contentArea.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Email registrace</h3>
                </div>
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Datum registrace</th>
                                <th>Akce</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${subscriptions.map(sub => `
                                <tr>
                                    <td><a href="mailto:${escapeHtml(sub.email)}">${escapeHtml(sub.email)}</a></td>
                                    <td>${formatDate(sub.created_at)}</td>
                                    <td>
                                        <button class="btn btn-danger btn-small" onclick="deleteItem('subscription', ${sub.id})">Smazat</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } catch (error) {
        contentArea.innerHTML = `<div class="message message-error">Chyba při načítání registrací: ${error.message}</div>`;
    }
}

// Load Settings
async function loadSettings() {
    const contentArea = document.getElementById('content-area');
    
    try {
        const response = await fetch(`${API_BASE}/settings`, { headers: getAuthHeaders() });
        const settings = await response.json();
        
        contentArea.innerHTML = `
            <form id="settings-form" class="card">
                <div class="card-header">
                    <h3 class="card-title">Základní nastavení</h3>
                </div>
                
                <div class="grid grid-2">
                    <div class="form-group">
                        <label class="form-label">Název webu</label>
                        <input type="text" class="form-input" name="site_title" value="${escapeHtml(settings.site_title || '')}">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Telefon</label>
                        <input type="text" class="form-input" name="site_phone" value="${escapeHtml(settings.site_phone || '')}">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-input" name="site_email" value="${escapeHtml(settings.site_email || '')}">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Facebook URL</label>
                        <input type="url" class="form-input" name="facebook_url" value="${escapeHtml(settings.facebook_url || '')}">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Instagram URL</label>
                        <input type="url" class="form-input" name="instagram_url" value="${escapeHtml(settings.instagram_url || '')}">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Twitter URL</label>
                        <input type="url" class="form-input" name="twitter_url" value="${escapeHtml(settings.twitter_url || '')}">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Google Calendar API Key</label>
                        <input type="text" class="form-input" name="google_calendar_api_key" value="${escapeHtml(settings.google_calendar_api_key || '')}">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Google Calendar ID</label>
                        <input type="text" class="form-input" name="google_calendar_id" value="${escapeHtml(settings.google_calendar_id || '')}">
                    </div>
                </div>
                
                <button type="submit" class="btn btn-primary">Uložit nastavení</button>
            </form>
        `;
        
        // Handle form submission
        document.getElementById('settings-form').addEventListener('submit', handleSettingsSubmit);
    } catch (error) {
        contentArea.innerHTML = `<div class="message message-error">Chyba při načítání nastavení: ${error.message}</div>`;
    }
}

// Load Music Player Settings
async function loadMusicPlayerSettings() {
    const contentArea = document.getElementById('content-area');
    
    try {
        const response = await fetch(`${API_BASE}/settings`, { headers: getAuthHeaders() });
        const settings = await response.json();
        
        contentArea.innerHTML = `
            <form id="music-player-form" class="card">
                <div class="card-header">
                    <h3 class="card-title">Music Player nastavení</h3>
                </div>
                
                <div class="form-group">
                    <label class="form-label">
                        <input type="checkbox" name="music_player_enabled" value="1" ${settings.music_player_enabled === '1' ? 'checked' : ''}>
                        Aktivovat music player
                    </label>
                </div>
                
                <div class="grid grid-2">
                    <div class="form-group">
                        <label class="form-label">Typ služby</label>
                        <select class="form-select" name="music_player_type">
                            <option value="bandcamp" ${settings.music_player_type === 'bandcamp' ? 'selected' : ''}>Bandcamp</option>
                            <option value="soundcloud" ${settings.music_player_type === 'soundcloud' ? 'selected' : ''}>SoundCloud</option>
                            <option value="spotify" ${settings.music_player_type === 'spotify' ? 'selected' : ''}>Spotify</option>
                            <option value="youtube" ${settings.music_player_type === 'youtube' ? 'selected' : ''}>YouTube</option>
                            <option value="custom" ${settings.music_player_type === 'custom' ? 'selected' : ''}>Custom HTML</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Autoplay</label>
                        <label class="form-label">
                            <input type="checkbox" name="music_player_autoplay" value="1" ${settings.music_player_autoplay === '1' ? 'checked' : ''}>
                            Automatické přehrávání
                        </label>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">URL / Embed kód</label>
                    <textarea class="form-textarea" name="music_player_url" rows="4" placeholder="Vložte embed kód nebo URL">${escapeHtml(settings.music_player_url || '')}</textarea>
                    <div class="small-text">
                        <strong>Bandcamp:</strong> Zkopírujte embed kód z Bandcamp (celý &lt;iframe&gt; tag)<br>
                        <strong>SoundCloud:</strong> Zkopírujte embed kód z SoundCloud<br>
                        <strong>Spotify:</strong> Zkopírujte Spotify embed kód<br>
                        <strong>YouTube:</strong> Vložte YouTube URL nebo embed kód
                    </div>
                </div>
                
                <div class="grid grid-2">
                    <div class="form-group">
                        <label class="form-label">Název skladby</label>
                        <input type="text" class="form-input" name="music_player_track_title" value="${escapeHtml(settings.music_player_track_title || '')}" placeholder="Název skladby/alba">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Umělec/Kapela</label>
                        <input type="text" class="form-input" name="music_player_track_artist" value="${escapeHtml(settings.music_player_track_artist || '')}" placeholder="Jméno umělce nebo kapely">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Obrázek alba (URL)</label>
                    <input type="url" class="form-input" name="music_player_artwork_url" value="${escapeHtml(settings.music_player_artwork_url || '')}" placeholder="URL obrázku alba/singlu">
                </div>
                
                <button type="submit" class="btn btn-primary">Uložit nastavení</button>
            </form>
        `;
        
        // Handle form submission
        document.getElementById('music-player-form').addEventListener('submit', handleSettingsSubmit);
    } catch (error) {
        contentArea.innerHTML = `<div class="message message-error">Chyba při načítání nastavení: ${error.message}</div>`;
    }
}

// Handle Settings Submit
async function handleSettingsSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const settings = {};
    
    for (let [key, value] of formData.entries()) {
        settings[key] = value;
    }
    
    // Handle checkboxes
    const checkboxes = e.target.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        if (!settings[cb.name]) {
            settings[cb.name] = '0';
        }
    });
    
    try {
        const response = await fetch(`${API_BASE}/settings`, {
            method: 'PUT',
            headers: {
                ...getAuthHeaders(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
        });
        
        if (response.ok) {
            showMessage(null, 'Nastavení byla úspěšně uložena', 'success');
        } else {
            const error = await response.json();
            showMessage(null, 'Chyba při ukládání: ' + (error.error || 'Neznámá chyba'), 'error');
        }
    } catch (error) {
        showMessage(null, 'Chyba při ukládání nastavení', 'error');
    }
}

// Open Edit Modal
async function openEditModal(type, id = null) {
    const modal = document.getElementById('edit-modal');
    const title = document.getElementById('edit-modal-title');
    const content = document.getElementById('edit-modal-content');
    
    const titles = {
        band: id ? 'Upravit kapelu' : 'Přidat kapelu',
        vinyl: id ? 'Upravit vinyl' : 'Přidat vinyl',
        event: id ? 'Upravit koncert' : 'Přidat koncert',
        news: id ? 'Upravit novinku' : 'Přidat novinku'
    };
    
    title.textContent = titles[type];
    
    let item = {};
    if (id) {
        try {
            const response = await fetch(`${API_BASE}/${type}s/${id}`, { headers: getAuthHeaders() });
            item = await response.json();
        } catch (error) {
            console.error('Error loading item:', error);
        }
    }
    
    let formHTML = '';
    
    switch(type) {
        case 'band':
            formHTML = createBandForm(item);
            break;
        case 'vinyl':
            formHTML = createVinylForm(item);
            break;
        case 'event':
            formHTML = createEventForm(item);
            break;
        case 'news':
            formHTML = createNewsForm(item);
            break;
    }
    
    content.innerHTML = formHTML;
    
    // Initialize form submission
    const form = content.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(type, id, form);
        });
    }
    
    modal.classList.add('active');
}

// Create Band Form
function createBandForm(band) {
    return `
        <form id="band-form" enctype="multipart/form-data">
            <div class="form-group">
                <label class="form-label">Název kapely *</label>
                <input type="text" class="form-input" name="name" value="${escapeHtml(band.name || '')}" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">Krátký popis</label>
                <textarea class="form-textarea" name="short_description" rows="3">${escapeHtml(band.short_description || '')}</textarea>
            </div>
            
            <div class="form-group">
                <label class="form-label">Dlouhý popis</label>
                <textarea class="form-textarea" name="long_description" rows="5">${escapeHtml(band.long_description || '')}</textarea>
            </div>
            
            <div class="form-group">
                <label class="form-label">Obrázek</label>
                <input type="file" class="form-input" name="image" accept="image/*">
                ${band.image ? `<div class="small-text">Aktuální: ${band.image}</div>` : ''}
            </div>
            
            <div class="grid grid-2">
                <div class="form-group">
                    <label class="form-label">Booking URL</label>
                    <input type="url" class="form-input" name="booking_url" value="${escapeHtml(band.booking_url || '')}">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Website URL</label>
                    <input type="url" class="form-input" name="website_url" value="${escapeHtml(band.website_url || '')}">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Facebook URL</label>
                    <input type="url" class="form-input" name="facebook_url" value="${escapeHtml(band.facebook_url || '')}">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Instagram URL</label>
                    <input type="url" class="form-input" name="instagram_url" value="${escapeHtml(band.instagram_url || '')}">
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                <button type="button" class="btn btn-secondary" onclick="closeModal('edit-modal')">Zrušit</button>
                <button type="submit" class="btn btn-primary">Uložit</button>
            </div>
        </form>
    `;
}

// Create Vinyl Form
async function createVinylForm(vinyl) {
    // Fetch bands for dropdown
    let bandsOptions = '';
    try {
        const response = await fetch(`${API_BASE}/bands`, { headers: getAuthHeaders() });
        const bands = await response.json();
        bandsOptions = bands.map(band => 
            `<option value="${band.id}" ${vinyl.band_id == band.id ? 'selected' : ''}>${escapeHtml(band.name)}</option>`
        ).join('');
    } catch (error) {
        console.error('Error loading bands:', error);
    }
    
    return `
        <form id="vinyl-form" enctype="multipart/form-data">
            <div class="form-group">
                <label class="form-label">Název alba *</label>
                <input type="text" class="form-input" name="title" value="${escapeHtml(vinyl.title || '')}" required>
            </div>
            
            <div class="grid grid-2">
                <div class="form-group">
                    <label class="form-label">Kapela</label>
                    <select class="form-select" name="band_id">
                        <option value="">Vyberte kapelu</option>
                        ${bandsOptions}
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Cena (Kč)</label>
                    <input type="number" class="form-input" name="price" value="${vinyl.price || ''}" min="0">
                </div>
            </div>
            
            <div class="form-group">
                <label class="form-label">Skladem</label>
                <input type="number" class="form-input" name="stock" value="${vinyl.stock || 0}" min="0">
            </div>
            
            <div class="form-group">
                <label class="form-label">Popis</label>
                <textarea class="form-textarea" name="description" rows="5">${escapeHtml(vinyl.description || '')}</textarea>
            </div>
            
            <div class="form-group">
                <label class="form-label">Obrázek alba</label>
                <input type="file" class="form-input" name="image" accept="image/*">
                ${vinyl.image ? `<div class="small-text">Aktuální: ${vinyl.image}</div>` : ''}
            </div>
            
            <div class="grid grid-2">
                <div class="form-group">
                    <label class="form-label">Bandcamp URL</label>
                    <input type="url" class="form-input" name="bandcamp_url" value="${escapeHtml(vinyl.bandcamp_url || '')}">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Apple Music URL</label>
                    <input type="url" class="form-input" name="apple_music_url" value="${escapeHtml(vinyl.apple_music_url || '')}">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Spotify URL</label>
                    <input type="url" class="form-input" name="spotify_url" value="${escapeHtml(vinyl.spotify_url || '')}">
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                <button type="button" class="btn btn-secondary" onclick="closeModal('edit-modal')">Zrušit</button>
                <button type="submit" class="btn btn-primary">Uložit</button>
            </div>
        </form>
    `;
}

// Create Event Form
async function createEventForm(event) {
    // Fetch bands for dropdown
    let bandsOptions = '';
    try {
        const response = await fetch(`${API_BASE}/bands`, { headers: getAuthHeaders() });
        const bands = await response.json();
        bandsOptions = bands.map(band => 
            `<option value="${band.id}" ${event.band_id == band.id ? 'selected' : ''}>${escapeHtml(band.name)}</option>`
        ).join('');
    } catch (error) {
        console.error('Error loading bands:', error);
    }
    
    return `
        <form id="event-form" enctype="multipart/form-data">
            <div class="form-group">
                <label class="form-label">Název akce *</label>
                <input type="text" class="form-input" name="title" value="${escapeHtml(event.title || '')}" required>
            </div>
            
            <div class="grid grid-2">
                <div class="form-group">
                    <label class="form-label">Kapela</label>
                    <select class="form-select" name="band_id">
                        <option value="">Vyberte kapelu</option>
                        ${bandsOptions}
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Datum *</label>
                    <input type="date" class="form-input" name="date" value="${event.date || ''}" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Čas</label>
                    <input type="time" class="form-input" name="time" value="${event.time || ''}">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Cena</label>
                    <input type="text" class="form-input" name="price" value="${escapeHtml(event.price || '')}" placeholder="např. 250 Kč nebo 5€">
                </div>
            </div>
            
            <div class="form-group">
                <label class="form-label">Místo konání *</label>
                <input type="text" class="form-input" name="venue" value="${escapeHtml(event.venue || '')}" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">Obrázek</label>
                <input type="file" class="form-input" name="image" accept="image/*">
                ${event.image ? `<div class="small-text">Aktuální: ${event.image}</div>` : ''}
            </div>
            
            <div class="grid grid-2">
                <div class="form-group">
                    <label class="form-label">Lístky URL</label>
                    <input type="url" class="form-input" name="tickets_url" value="${escapeHtml(event.tickets_url || '')}">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Website URL</label>
                    <input type="url" class="form-input" name="website_url" value="${escapeHtml(event.website_url || '')}">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Facebook URL</label>
                    <input type="url" class="form-input" name="facebook_url" value="${escapeHtml(event.facebook_url || '')}">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Instagram URL</label>
                    <input type="url" class="form-input" name="instagram_url" value="${escapeHtml(event.instagram_url || '')}">
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                <button type="button" class="btn btn-secondary" onclick="closeModal('edit-modal')">Zrušit</button>
                <button type="submit" class="btn btn-primary">Uložit</button>
            </div>
        </form>
    `;
}

// Create News Form
function createNewsForm(news) {
    return `
        <form id="news-form" enctype="multipart/form-data">
            <div class="form-group">
                <label class="form-label">Název *</label>
                <input type="text" class="form-input" name="title" value="${escapeHtml(news.title || '')}" required>
            </div>
            
            <div class="grid grid-2">
                <div class="form-group">
                    <label class="form-label">Autor</label>
                    <input type="text" class="form-input" name="author" value="${escapeHtml(news.author || 'Lajf')}">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Stav</label>
                    <label class="form-label">
                        <input type="checkbox" name="published" value="1" ${news.published ? 'checked' : ''}>
                        Publikovat
                    </label>
                </div>
            </div>
            
            <div class="form-group">
                <label class="form-label">Krátký popis</label>
                <textarea class="form-textarea" name="excerpt" rows="3">${escapeHtml(news.excerpt || '')}</textarea>
            </div>
            
            <div class="form-group">
                <label class="form-label">Obsah</label>
                <textarea class="form-textarea" name="content" rows="8">${escapeHtml(news.content || '')}</textarea>
            </div>
            
            <div class="form-group">
                <label class="form-label">Obrázek</label>
                <input type="file" class="form-input" name="image" accept="image/*">
                ${news.image ? `<div class="small-text">Aktuální: ${news.image}</div>` : ''}
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                <button type="button" class="btn btn-secondary" onclick="closeModal('edit-modal')">Zrušit</button>
                <button type="submit" class="btn btn-primary">Uložit</button>
            </div>
        </form>
    `;
}

// Handle Form Submit
async function handleFormSubmit(type, id, form) {
    const formData = new FormData(form);
    
    // Handle checkboxes
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        if (!formData.has(cb.name)) {
            formData.append(cb.name, '0');
        }
    });
    
    // Add type for file upload
    formData.append('type', type + 's');
    
    try {
        const url = `${API_BASE}/${type}s${id ? `/${id}` : ''}`;
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: getAuthHeaders(),
            body: formData
        });
        
        const result = await response.json();
        
        if (response.ok) {
            closeModal('edit-modal');
            showMessage(null, result.message || 'Úspěšně uloženo', 'success');
            loadSection(currentSection); // Reload current section
        } else {
            showMessage(null, result.error || 'Chyba při ukládání', 'error');
        }
    } catch (error) {
        showMessage(null, 'Chyba při ukládání', 'error');
    }
}

// Delete Item
async function deleteItem(type, id) {
    if (!confirm('Opravdu chcete smazat tuto položku?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/${type}s/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showMessage(null, result.message || 'Úspěšně smazáno', 'success');
            loadSection(currentSection); // Reload current section
        } else {
            showMessage(null, result.error || 'Chyba při mazání', 'error');
        }
    } catch (error) {
        showMessage(null, 'Chyba při mazání', 'error');
    }
}

// Close Modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Get Auth Headers
function getAuthHeaders() {
    return authToken ? { 'Authorization': `Bearer ${authToken}` } : {};
}

// Show Message
function showMessage(element, message, type) {
    const messageEl = element || createFloatingMessage();
    messageEl.textContent = message;
    messageEl.className = `message message-${type}`;
    
    if (!element) {
        document.body.appendChild(messageEl);
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 5000);
    }
}

// Create Floating Message
function createFloatingMessage() {
    const messageEl = document.createElement('div');
    messageEl.style.position = 'fixed';
    messageEl.style.top = '20px';
    messageEl.style.right = '20px';
    messageEl.style.zIndex = '10000';
    messageEl.style.maxWidth = '400px';
    return messageEl;
}

// Utility Functions
function escapeHtml(text) {
    if (typeof text !== 'string') return text;
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('cs-CZ');
}

// Global functions for onclick handlers
window.openEditModal = openEditModal;
window.deleteItem = deleteItem;
window.closeModal = closeModal;
window.logout = logout;
