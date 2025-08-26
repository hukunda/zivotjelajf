# 🎸 Život je lajf - Underground Music Management

**Professional music management and vinyl production platform for the Czech underground scene.**

![Underground Music](https://img.shields.io/badge/Genre-Underground%20Music-ff4444)
![Czech](https://img.shields.io/badge/Language-Czech-0080ff)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)

## 🎯 About

"Život je lajf" is a comprehensive platform for underground music management, featuring:

- **Band management** and promotion
- **Vinyl production** and sales
- **Concert organization** and booking
- **Music streaming** with sticky player
- **Fan engagement** tools
- **E-commerce** integration

> *"U nás u 'Život je lajf' věříme, že život je příliš krátký na špatnou hudbu."*

## 📁 Project Structure

This repository contains **two complete implementations**:

### 🎵 WordPress Theme Version
```
/
├── style.css              # Main WordPress theme stylesheet
├── functions.php          # Core PHP functionality
├── front-page.php         # Homepage template
├── header.php             # Site header
├── footer.php             # Site footer with music player
├── page-*.php             # Custom page templates
├── single-*.php           # Single post templates
├── js/main.js             # JavaScript functionality
├── plugins/               # Custom plugins
│   └── zivot-google-calendar/
└── *.md                   # Documentation files
```

### 🚀 Modern HTML5 Version
```
html5-version/
├── server.js              # Node.js backend
├── package.json           # Dependencies
├── public/                # Frontend files
│   ├── index.html         # Single-page application
│   ├── assets/css/        # Stylesheets
│   └── assets/js/         # JavaScript
├── admin/                 # Admin panel
│   ├── index.html         # Admin interface
│   └── admin.js           # Admin functionality
└── README.md              # HTML5 version docs
```

## ✨ Features

### 🎸 **Band Management**
- Professional band profiles with photos and bios
- Booking system integration
- Social media links
- Concert history tracking

### 💿 **Vinyl Production & Sales**
- Complete e-commerce solution
- Inventory management
- Automated order processing
- Integration with payment systems

### 🎪 **Event Management**
- Google Calendar synchronization
- Manual event creation
- Ticket sales integration
- Venue information management

### 🎵 **Music Player**
- Sticky bottom player
- Multi-platform support (Bandcamp, SoundCloud, Spotify, YouTube)
- Non-coder friendly admin interface
- Responsive design with keyboard shortcuts

### 📧 **Fan Engagement**
- Email subscription system
- Newsletter management
- Social media integration
- Contact forms

## 🚀 Quick Start

### WordPress Version

1. **Upload theme files** to `/wp-content/themes/`
2. **Activate theme** in WordPress admin
3. **Install plugins** from `/plugins/` directory
4. **Configure settings** following `SETUP-INSTRUCTIONS.md`
5. **Add content** using the admin interface

### HTML5 Version

1. **Install dependencies:**
   ```bash
   cd html5-version
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Access the application:**
   - **Website:** http://localhost:3000
   - **Admin panel:** http://localhost:3000/admin
   - **Default login:** admin / admin123

## 📚 Documentation

### 📖 **Complete Guides**
- **[SETUP-INSTRUCTIONS.md](SETUP-INSTRUCTIONS.md)** - WordPress installation and configuration
- **[USER-MANAGEMENT-GUIDE.md](USER-MANAGEMENT-GUIDE.md)** - Content management manual
- **[IMAGE-USAGE-GUIDE.md](IMAGE-USAGE-GUIDE.md)** - How to use artwork and photos
- **[MUSIC-PLAYER-DEMO.md](MUSIC-PLAYER-DEMO.md)** - Music player configuration
- **[COMPLETE-WEBSITE-SUMMARY.md](COMPLETE-WEBSITE-SUMMARY.md)** - Feature overview

### 🔧 **Technical Docs**
- **[PAGE-ROUTING-FIX.md](PAGE-ROUTING-FIX.md)** - Template system details
- **[html5-version/README.md](html5-version/README.md)** - Modern version documentation

## 🎨 Design & Branding

### **Color Palette**
- **Background:** `#0a0f1c` (Very dark navy)
- **Surface:** `#1a2332` (Dark blue-gray)
- **Primary:** `#ff4444` (Red accent)
- **Secondary:** `#8a2be2` (Purple)
- **Text:** `#ffffff` (White)

### **Typography**
- **Headers:** Bold, uppercase, condensed
- **Body:** Clean sans-serif
- **Accent:** Underground music aesthetic

### **Visual Style**
- Dark underground theme
- Illustrated backgrounds
- Rounded corners and shadows
- Professional card layouts
- Mobile-responsive design

## 🛠️ Technology Stack

### **WordPress Version**
- **PHP 7.4+**
- **MySQL 5.7+**
- **WordPress 5.8+**
- **WooCommerce** for e-commerce
- **Custom Post Types** for content management
- **Google Calendar API** for event sync

### **HTML5 Version**
- **Node.js** backend
- **SQLite** database
- **Express.js** framework
- **Vanilla JavaScript** frontend
- **CSS Grid & Flexbox**
- **RESTful API** architecture

## 📱 Browser Support

- ✅ **Chrome** 90+
- ✅ **Firefox** 88+
- ✅ **Safari** 14+
- ✅ **Edge** 90+
- ✅ **Mobile browsers**

## 🔒 Security Features

- Input validation and sanitization
- CSRF protection
- SQL injection prevention
- Rate limiting
- Secure file uploads
- Authentication tokens

## 🌍 Internationalization

- **Primary language:** Czech
- **Admin interface:** Czech
- **Documentation:** Czech with English technical notes
- **Date formats:** Czech locale
- **Currency:** Czech crowns (Kč)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support & Contact

- **Email:** cau@zivotjelajf.com
- **Phone:** +420 727 273 372
- **Website:** [Coming soon]

## 🎉 Acknowledgments

- **Underground music community** in Prague
- **Czech vinyl collectors** and enthusiasts
- **Independent artists** who keep the scene alive
- **Open source community** for tools and inspiration

---

**🎸 "No, život je lajf!" 🤘**

*Built with ❤️ for the underground music scene in Prague, Czech Republic.*