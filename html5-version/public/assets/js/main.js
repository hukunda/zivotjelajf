// Global variables
let currentSection = 'home';
let musicPlayerEnabled = false;
let settings = {};

// API Base URL
const API_BASE = window.location.origin + '/api';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
async function initializeApp() {
    try {
        // Load settings
        await loadSettings();
        
        // Initialize navigation
        initializeNavigation();
        
        // Load initial content
        await loadHomeContent();
        
        // Initialize forms
        initializeForms();
        
        // Initialize music player if enabled
        if (settings.music_player_enabled === '1') {
            initializeMusicPlayer();
        }
        
        // Initialize scroll effects
        initializeScrollEffects();
        
        // Hide loading screen
        hideLoadingScreen();
        
        // Console easter egg
        console.log('%cŽivot je lajf!', 'color: #ff4444; font-size: 24px; font-weight: bold;');
        console.log('%cHledáš něco v kódu? 😉 Kontaktuj nás na cau@zivotjelajf.com', 'color: #b8c5d1; font-size: 14px;');
        
    } catch (error) {
        console.error('Error initializing app:', error);
        hideLoadingScreen();
    }
}

// Load Settings
async function loadSettings() {
    try {
        const response = await fetch(`${API_BASE}/settings`);
        settings = await response.json();
        
        // Update site info
        updateSiteInfo();
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

// Update Site Info
function updateSiteInfo() {
    // Update contact info
    const phoneElements = document.querySelectorAll('#site-phone, #footer-phone');
    phoneElements.forEach(el => {
        if (el) {
            el.textContent = settings.site_phone || '+420 727 273 372';
            if (el.tagName === 'A') {
                el.href = `tel:${settings.site_phone}`;
            }
        }
    });
    
    const emailElements = document.querySelectorAll('#site-email, #footer-email');
    emailElements.forEach(el => {
        if (el) {
            el.textContent = settings.site_email || 'cau@zivotjelajf.com';
            if (el.tagName === 'A') {
                el.href = `mailto:${settings.site_email}`;
            }
        }
    });
    
    // Update social links
    const socialLinks = {
        facebook: document.getElementById('social-facebook'),
        instagram: document.getElementById('social-instagram'),
        twitter: document.getElementById('social-twitter')
    };
    
    Object.keys(socialLinks).forEach(platform => {
        const element = socialLinks[platform];
        const url = settings[`${platform}_url`];
        if (element && url) {
            element.href = url;
            element.style.display = 'block';
        } else if (element) {
            element.style.display = 'none';
        }
    });
}

// Hide Loading Screen
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }
}

// Initialize Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            navigateToSection(target);
        });
    });
    
    // Mobile menu toggle
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Handle hash changes
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            navigateToSection(hash);
        }
    });
    
    // Initial navigation
    const hash = window.location.hash.substring(1);
    if (hash) {
        navigateToSection(hash);
    }
}

// Navigate to Section
function navigateToSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        currentSection = sectionId;
        
        // Update URL
        window.history.pushState({}, '', `#${sectionId}`);
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Load section-specific content
        loadSectionContent(sectionId);
        
        // Scroll to top
        window.scrollTo(0, 0);
    } else {
        // Show home section
        document.getElementById('home').style.display = 'block';
        currentSection = 'home';
    }
}

// Load Section Content
async function loadSectionContent(sectionId) {
    switch(sectionId) {
        case 'kapely':
            await loadAllBands();
            break;
        case 'vinyly':
            await loadAllVinyls();
            break;
        case 'koncerty':
            await loadAllEvents();
            break;
        case 'o-zivote':
            await loadNews();
            break;
    }
}

// Load Home Content
async function loadHomeContent() {
    try {
        await Promise.all([
            loadUpcomingEvents(),
            loadHomeBands(),
            loadHomeVinyls()
        ]);
    } catch (error) {
        console.error('Error loading home content:', error);
    }
}

// Load Upcoming Events
async function loadUpcomingEvents() {
    try {
        const response = await fetch(`${API_BASE}/events?upcoming=true`);
        const events = await response.json();
        
        const container = document.getElementById('upcoming-events');
        if (!container) return;
        
        if (events.length === 0) {
            container.innerHTML = createPlaceholderEvents();
        } else {
            container.innerHTML = events.slice(0, 4).map(event => createEventCard(event)).join('');
        }
    } catch (error) {
        console.error('Error loading upcoming events:', error);
        const container = document.getElementById('upcoming-events');
        if (container) {
            container.innerHTML = createPlaceholderEvents();
        }
    }
}

// Create Event Card
function createEventCard(event) {
    const date = new Date(event.date);
    const formattedDate = formatCzechDate(date);
    
    return `
        <div class="event-card">
            <div class="event-date">${formattedDate}</div>
            <h3 class="event-title">${escapeHtml(event.band_name || event.title)}</h3>
            <p class="event-venue">${escapeHtml(event.venue)}</p>
            
            <div class="event-meta">
                <div class="event-details">
                    ${event.time ? `<span>Od ${escapeHtml(event.time)}</span>` : ''}
                    ${event.price ? `<span class="event-price">${escapeHtml(event.price)}</span>` : ''}
                </div>
                
                <div class="social-links">
                    ${event.website_url ? `<a href="${escapeHtml(event.website_url)}" target="_blank" rel="noopener">W</a>` : ''}
                    ${event.facebook_url ? `<a href="${escapeHtml(event.facebook_url)}" target="_blank" rel="noopener">FB</a>` : ''}
                    ${event.instagram_url ? `<a href="${escapeHtml(event.instagram_url)}" target="_blank" rel="noopener">IG</a>` : ''}
                </div>
            </div>
        </div>
    `;
}

// Create Placeholder Events
function createPlaceholderEvents() {
    const placeholderEvents = [
        { date: '19. dubna', band: 'ACID ROW', venue: 'Rock Café, Praha', time: '20:00', price: '250 Kč' },
        { date: '20. dubna', band: 'OOBBT', venue: 'Cross Club, Praha', time: '21:00' },
        { date: '21. dubna', band: 'KAPELA PIVÍČKO', venue: 'Palác Akropolis, Praha', time: '19:30', price: '180 Kč' },
        { date: '22. května', band: 'ČAU', venue: 'Café V lese, Praha', time: '20:00', price: '150 Kč' }
    ];
    
    return placeholderEvents.map(event => `
        <div class="event-card">
            <div class="event-date">${event.date}</div>
            <h3 class="event-title">${event.band}</h3>
            <p class="event-venue">${event.venue}</p>
            
            <div class="event-meta">
                <div class="event-details">
                    <span>Od ${event.time}</span>
                    ${event.price ? `<span class="event-price">${event.price}</span>` : ''}
                </div>
                
                <div class="social-links">
                    <a href="#" target="_blank" rel="noopener">W</a>
                    <a href="#" target="_blank" rel="noopener">FB</a>
                    <a href="#" target="_blank" rel="noopener">IG</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Load Home Bands
async function loadHomeBands() {
    try {
        const response = await fetch(`${API_BASE}/bands`);
        const bands = await response.json();
        
        const container = document.getElementById('home-bands');
        if (!container) return;
        
        if (bands.length === 0) {
            container.innerHTML = createPlaceholderBands();
        } else {
            container.innerHTML = bands.slice(0, 4).map(band => createBandCard(band)).join('');
        }
    } catch (error) {
        console.error('Error loading home bands:', error);
        const container = document.getElementById('home-bands');
        if (container) {
            container.innerHTML = createPlaceholderBands();
        }
    }
}

// Create Band Card
function createBandCard(band) {
    const imageUrl = band.image ? band.image : null;
    
    return `
        <div class="band-card card" onclick="showBandModal(${band.id})">
            ${imageUrl ? 
                `<img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(band.name)}">` :
                `<div class="placeholder-image" style="height: 200px; background: linear-gradient(135deg, #ff4444, #8B0000, #2F4F4F);">🎸</div>`
            }
            <h3 class="band-name">${escapeHtml(band.name)}</h3>
            ${band.short_description ? `<p>${escapeHtml(band.short_description)} <a href="#" onclick="event.stopPropagation(); showBandModal(${band.id})">Proklik na detail.</a></p>` : ''}
        </div>
    `;
}

// Create Placeholder Bands
function createPlaceholderBands() {
    const placeholderBands = [
        { name: 'ACID ROW', description: 'A three-piece from Prague bringing heavy guitar sounds with melodic vocals.', gradient: 'linear-gradient(135deg, #ff4444, #cc0000)', icon: '🎸' },
        { name: 'OOBBT', description: 'Experimental electronic duo mixing organic instruments with digital beats.', gradient: 'linear-gradient(135deg, #8a2be2, #4b0082)', icon: '🎛️' },
        { name: 'KAPELA PIVÍČKO', description: 'Základní info, já nevím co všechno. Asi že jsou dobrý.', gradient: 'linear-gradient(135deg, #ff8c00, #ff4500)', icon: '🍺' },
        { name: 'ČAU', description: 'Indie pop projekt s melancholickými melodiemi a poetickými texty.', gradient: 'linear-gradient(135deg, #20b2aa, #008b8b)', icon: '🌙' }
    ];
    
    return placeholderBands.map(band => `
        <div class="band-card card">
            <div class="placeholder-image" style="height: 200px; background: ${band.gradient};">${band.icon}</div>
            <h3 class="band-name">${band.name}</h3>
            <p>${band.description} <a href="#" style="color: #ff4444;">Proklik na detail.</a></p>
        </div>
    `).join('');
}

// Load Home Vinyls
async function loadHomeVinyls() {
    try {
        const response = await fetch(`${API_BASE}/vinyls`);
        const vinyls = await response.json();
        
        const container = document.getElementById('home-vinyls');
        if (!container) return;
        
        if (vinyls.length === 0) {
            container.innerHTML = createPlaceholderVinyls();
        } else {
            container.innerHTML = vinyls.slice(0, 3).map(vinyl => createVinylCard(vinyl)).join('');
        }
    } catch (error) {
        console.error('Error loading home vinyls:', error);
        const container = document.getElementById('home-vinyls');
        if (container) {
            container.innerHTML = createPlaceholderVinyls();
        }
    }
}

// Create Vinyl Card
function createVinylCard(vinyl) {
    const imageUrl = vinyl.image ? vinyl.image : null;
    
    return `
        <div class="vinyl-card card" onclick="showVinylModal(${vinyl.id})">
            ${imageUrl ? 
                `<img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(vinyl.title)}">` :
                `<div class="placeholder-image" style="height: 250px; background: linear-gradient(45deg, #ff4444, #8B0000, #2F4F4F);">
                    <div style="position: relative;">
                        <div style="width: 200px; height: 200px; border: 3px solid rgba(255,255,255,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <div style="width: 30px; height: 30px; background: rgba(255,255,255,0.5); border-radius: 50%;"></div>
                        </div>
                    </div>
                </div>`
            }
            <h3 class="vinyl-title">${escapeHtml(vinyl.title)}</h3>
            ${vinyl.band_name ? `<p class="small-text">${escapeHtml(vinyl.band_name)}</p>` : ''}
            <p>${vinyl.description ? escapeHtml(vinyl.description.substring(0, 100)) + '...' : 'Povídání o vinylu, jak vznikl...'} <a href="#" onclick="event.stopPropagation(); showVinylModal(${vinyl.id})">Proklik na detail.</a></p>
            <div class="vinyl-actions">
                <button class="btn btn-primary" onclick="event.stopPropagation(); orderVinyl(${vinyl.id})">Kup vinyl${vinyl.price ? ` - ${vinyl.price} Kč` : ''}</button>
            </div>
        </div>
    `;
}

// Create Placeholder Vinyls
function createPlaceholderVinyls() {
    const placeholderVinyls = [
        { title: 'POISONED MIND / ACID ROW', band: 'ACID ROW', price: '450 Kč', gradient: 'linear-gradient(45deg, #ff4444, #8B0000, #2F4F4F)' },
        { title: 'ELECTRONIC DREAMS', band: 'OOBBT', price: '380 Kč', gradient: 'linear-gradient(45deg, #8a2be2, #4b0082, #191970)' },
        { title: 'PIVNÍ SEZÓNA', band: 'KAPELA PIVÍČKO', price: '320 Kč', gradient: 'linear-gradient(45deg, #ff8c00, #ff4500, #8B4513)' }
    ];
    
    return placeholderVinyls.map(vinyl => `
        <div class="vinyl-card card">
            <div class="placeholder-image" style="height: 250px; background: ${vinyl.gradient};">
                <div style="position: relative;">
                    <div style="width: 200px; height: 200px; border: 3px solid rgba(255,255,255,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <div style="width: 30px; height: 30px; background: rgba(255,255,255,0.5); border-radius: 50%;"></div>
                    </div>
                </div>
            </div>
            <h3 class="vinyl-title">${vinyl.title}</h3>
            <p class="small-text">${vinyl.band}</p>
            <p>Povídání o vinylu, jak vznikl nebo já nevím co všechno. <a href="#" style="color: #ff4444;">Proklik na detail.</a></p>
            <div class="vinyl-actions">
                <a href="mailto:cau@zivotjelajf.com?subject=Objednávka - ${vinyl.title}" class="btn btn-primary">Kup vinyl - ${vinyl.price}</a>
            </div>
        </div>
    `).join('');
}

// Load All Bands
async function loadAllBands() {
    try {
        const response = await fetch(`${API_BASE}/bands`);
        const bands = await response.json();
        
        const container = document.getElementById('all-bands');
        if (!container) return;
        
        if (bands.length === 0) {
            container.innerHTML = createPlaceholderBands();
        } else {
            container.innerHTML = bands.map(band => createBandCard(band)).join('');
        }
    } catch (error) {
        console.error('Error loading all bands:', error);
    }
}

// Load All Vinyls
async function loadAllVinyls() {
    try {
        const response = await fetch(`${API_BASE}/vinyls`);
        const vinyls = await response.json();
        
        const container = document.getElementById('all-vinyls');
        if (!container) return;
        
        if (vinyls.length === 0) {
            container.innerHTML = createPlaceholderVinyls() + createPlaceholderVinyls();
        } else {
            container.innerHTML = vinyls.map(vinyl => createVinylCard(vinyl)).join('');
        }
    } catch (error) {
        console.error('Error loading all vinyls:', error);
    }
}

// Load All Events
async function loadAllEvents() {
    try {
        const response = await fetch(`${API_BASE}/events`);
        const events = await response.json();
        
        const tbody = document.getElementById('all-events-tbody');
        if (!tbody) return;
        
        if (events.length === 0) {
            tbody.innerHTML = createPlaceholderEventsTable();
        } else {
            tbody.innerHTML = events.map(event => createEventTableRow(event)).join('');
        }
    } catch (error) {
        console.error('Error loading all events:', error);
    }
}

// Create Event Table Row
function createEventTableRow(event) {
    const date = new Date(event.date);
    const formattedDate = formatCzechDate(date);
    
    return `
        <tr>
            <td><span class="event-date">${formattedDate}</span></td>
            <td><a href="#" onclick="showBandModal(${event.band_id})" style="color: #ff4444;">${escapeHtml(event.band_name || event.title)}</a></td>
            <td>${escapeHtml(event.venue)}</td>
            <td>${event.time || '-'}</td>
            <td>${event.price ? `<span class="event-price">${escapeHtml(event.price)}</span>` : '-'}</td>
            <td>${event.tickets_url ? `<a href="${escapeHtml(event.tickets_url)}" class="btn btn-primary btn-sm" target="_blank">Lupeny</a>` : '-'}</td>
            <td>
                <div class="social-links">
                    ${event.website_url ? `<a href="${escapeHtml(event.website_url)}" target="_blank" rel="noopener">W</a>` : ''}
                    ${event.facebook_url ? `<a href="${escapeHtml(event.facebook_url)}" target="_blank" rel="noopener">FB</a>` : ''}
                    ${event.instagram_url ? `<a href="${escapeHtml(event.instagram_url)}" target="_blank" rel="noopener">IG</a>` : ''}
                </div>
            </td>
        </tr>
    `;
}

// Create Placeholder Events Table
function createPlaceholderEventsTable() {
    const placeholderEvents = [
        { date: '19.4.', band: 'ACID ROW', venue: 'Rock Café, Praha', time: '20:00', price: '250 Kč' },
        { date: '20.4.', band: 'OOBBT', venue: 'Cross Club, Praha', time: '21:00', price: '' },
        { date: '21.4.', band: 'KAPELA PIVÍČKO', venue: 'Palác Akropolis, Praha', time: '19:30', price: '180 Kč' },
        { date: '22.5.', band: 'ČAU', venue: 'Café V lese, Praha', time: '20:00', price: '150 Kč' },
        { date: '22.5.', band: 'TORNATANKA', venue: 'Lucerna Music Bar, Praha', time: '21:00', price: '5€' }
    ];
    
    const rows = placeholderEvents.map(event => `
        <tr>
            <td><span class="event-date">${event.date}</span></td>
            <td><a href="#" style="color: #ff4444;">${event.band}</a></td>
            <td>${event.venue}</td>
            <td>${event.time}</td>
            <td>${event.price ? `<span class="event-price">${event.price}</span>` : '-'}</td>
            <td><a href="mailto:cau@zivotjelajf.com?subject=Lístky ${event.band} ${event.date}" class="btn btn-primary">Lupeny</a></td>
            <td>
                <div class="social-links">
                    <a href="#" target="_blank" rel="noopener">W</a>
                    <a href="#" target="_blank" rel="noopener">FB</a>
                    <a href="#" target="_blank" rel="noopener">IG</a>
                </div>
            </td>
        </tr>
    `).join('');
    
    return rows + `
        <tr>
            <td colspan="7" style="text-align: center; padding: 20px; background: linear-gradient(135deg, #ff4444, #ff6666); color: white;">
                <strong>👆 Toto jsou ukázkové koncerty</strong><br>
                <small>Pro přidání skutečných koncertů použijte admin panel na /admin</small>
            </td>
        </tr>
    `;
}

// Load News
async function loadNews() {
    try {
        const response = await fetch(`${API_BASE}/news?published=true`);
        const news = await response.json();
        
        const container = document.getElementById('news-section');
        if (!container) return;
        
        if (news.length === 0) {
            container.innerHTML = createPlaceholderNews();
        } else {
            container.innerHTML = news.slice(0, 6).map(article => createNewsCard(article)).join('');
        }
    } catch (error) {
        console.error('Error loading news:', error);
        const container = document.getElementById('news-section');
        if (container) {
            container.innerHTML = createPlaceholderNews();
        }
    }
}

// Create News Card
function createNewsCard(article) {
    const date = new Date(article.created_at);
    const formattedDate = formatCzechDate(date);
    
    return `
        <article class="card">
            <h3><a href="#" style="color: #ff4444;">${escapeHtml(article.title)}</a></h3>
            <p class="small-text">
                Autor: ${escapeHtml(article.author)} | ${formattedDate}
            </p>
            <p>${escapeHtml(article.excerpt || article.content.substring(0, 150))}...</p>
            <a href="#" class="btn btn-secondary">Číst více</a>
        </article>
    `;
}

// Create Placeholder News
function createPlaceholderNews() {
    const placeholderNews = [
        { title: 'Končím s kuerulantama, jdu na solovou dráhu', author: 'Lajf', date: new Date() },
        { title: 'nový koncertní turné kapely Hlučný Medvěd', author: 'Management', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
        { title: 'nové album kapely Hlučný Medued', author: 'Redakce', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
        { title: 'Nové partnerství s underground labely', author: 'Lajf', date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        { title: 'Život je lajf míří na letní festivaly', author: 'Events', date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) },
        { title: 'Podcast o underground scéně', author: 'Media', date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) }
    ];
    
    const articles = placeholderNews.map(article => `
        <article class="card">
            <h3><a href="#" style="color: #ff4444;">${article.title}</a></h3>
            <p class="small-text">
                Autor: ${article.author} | ${formatCzechDate(article.date)}
            </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
            <a href="#" class="btn btn-secondary">Číst více</a>
        </article>
    `).join('');
    
    return articles + `
        <div class="card text-center mt-4" style="background: linear-gradient(135deg, #ff4444, #ff6666); color: white;">
            <h3>👆 Toto jsou ukázkové příspěvky</h3>
            <p><strong>Pro přidání skutečných novinek použijte admin panel na /admin</strong></p>
        </div>
    `;
}

// Initialize Forms
function initializeForms() {
    // Email subscription form
    const subscribeForm = document.getElementById('email-subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', handleEmailSubscription);
    }
    
    // Order form
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderSubmission);
    }
    
    // Modal close handlers
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Click outside modal to close
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
}

// Handle Email Subscription
async function handleEmailSubscription(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('subscribe-email');
    const messageDiv = document.getElementById('subscribe-message');
    const email = emailInput.value.trim();
    
    if (!email) {
        showMessage(messageDiv, 'Zadejte email adresu', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showMessage(messageDiv, 'Díky! Jste přihlášeni k odběru.', 'success');
            emailInput.value = '';
        } else {
            showMessage(messageDiv, result.error || 'Chyba při přihlášení', 'error');
        }
    } catch (error) {
        showMessage(messageDiv, 'Chyba při odesílání', 'error');
    }
}

// Handle Order Submission
async function handleOrderSubmission(e) {
    e.preventDefault();
    
    const formData = {
        vinyl_id: document.getElementById('order-vinyl-id').value,
        customer_name: document.getElementById('customer-name').value,
        customer_email: document.getElementById('customer-email').value,
        customer_phone: document.getElementById('customer-phone').value,
        customer_address: document.getElementById('customer-address').value,
        quantity: parseInt(document.getElementById('order-quantity').value)
    };
    
    try {
        const response = await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert(`Objednávka byla úspěšně odeslána! Celková cena: ${result.total_price} Kč. Brzy vás budeme kontaktovat.`);
            closeModal('order-modal');
            document.getElementById('order-form').reset();
        } else {
            alert('Chyba při odesílání objednávky: ' + (result.error || 'Neznámá chyba'));
        }
    } catch (error) {
        alert('Chyba při odesílání objednávky');
    }
}

// Show Message
function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `subscribe-message ${type}`;
    setTimeout(() => {
        element.textContent = '';
        element.className = 'subscribe-message';
    }, 5000);
}

// Show Band Modal
async function showBandModal(bandId) {
    try {
        const response = await fetch(`${API_BASE}/bands/${bandId}`);
        const band = await response.json();
        
        const modalContent = document.getElementById('band-modal-content');
        modalContent.innerHTML = `
            <h2>${escapeHtml(band.name)}</h2>
            ${band.image ? `<img src="${escapeHtml(band.image)}" alt="${escapeHtml(band.name)}" style="width: 100%; max-width: 400px; border-radius: 8px; margin: 1rem 0;">` : ''}
            <p>${escapeHtml(band.long_description || band.short_description || 'Popis kapely není k dispozici.')}</p>
            ${band.booking_url ? `<a href="${escapeHtml(band.booking_url)}" class="btn btn-primary" target="_blank">BOOKUJ!</a>` : ''}
            <div class="social-links" style="margin-top: 1rem;">
                ${band.website_url ? `<a href="${escapeHtml(band.website_url)}" target="_blank" rel="noopener">Website</a>` : ''}
                ${band.facebook_url ? `<a href="${escapeHtml(band.facebook_url)}" target="_blank" rel="noopener">Facebook</a>` : ''}
                ${band.instagram_url ? `<a href="${escapeHtml(band.instagram_url)}" target="_blank" rel="noopener">Instagram</a>` : ''}
            </div>
        `;
        
        document.getElementById('band-modal').classList.add('active');
    } catch (error) {
        console.error('Error loading band details:', error);
    }
}

// Show Vinyl Modal
async function showVinylModal(vinylId) {
    try {
        const response = await fetch(`${API_BASE}/vinyls/${vinylId}`);
        const vinyl = await response.json();
        
        const modalContent = document.getElementById('vinyl-modal-content');
        modalContent.innerHTML = `
            <h2>${escapeHtml(vinyl.title)}</h2>
            ${vinyl.band_name ? `<p class="small-text">by ${escapeHtml(vinyl.band_name)}</p>` : ''}
            ${vinyl.image ? `<img src="${escapeHtml(vinyl.image)}" alt="${escapeHtml(vinyl.title)}" style="width: 100%; max-width: 300px; border-radius: 8px; margin: 1rem 0;">` : ''}
            <p>${escapeHtml(vinyl.description || 'Popis alba není k dispozici.')}</p>
            ${vinyl.price ? `<p><strong>Cena: ${vinyl.price} Kč</strong></p>` : ''}
            
            <div class="vinyl-actions" style="margin-top: 2rem;">
                ${vinyl.bandcamp_url ? `<a href="${escapeHtml(vinyl.bandcamp_url)}" class="btn btn-secondary" target="_blank">BandCamp</a>` : ''}
                ${vinyl.apple_music_url ? `<a href="${escapeHtml(vinyl.apple_music_url)}" class="btn btn-secondary" target="_blank">Apple Music</a>` : ''}
                ${vinyl.spotify_url ? `<a href="${escapeHtml(vinyl.spotify_url)}" class="btn btn-secondary" target="_blank">Spotify</a>` : ''}
                <button class="btn btn-primary" onclick="orderVinyl(${vinyl.id})">Kup vinyl</button>
            </div>
        `;
        
        document.getElementById('vinyl-modal').classList.add('active');
    } catch (error) {
        console.error('Error loading vinyl details:', error);
    }
}

// Order Vinyl
function orderVinyl(vinylId) {
    document.getElementById('order-vinyl-id').value = vinylId;
    closeModal('vinyl-modal');
    document.getElementById('order-modal').classList.add('active');
}

// Close Modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Initialize Music Player
function initializeMusicPlayer() {
    if (settings.music_player_url && settings.music_player_enabled === '1') {
        createMusicPlayer();
    }
}

// Create Music Player
function createMusicPlayer() {
    const container = document.getElementById('music-player-container');
    if (!container) return;
    
    const playerHTML = `
        <div class="music-player-bar" id="musicPlayer">
            <div class="music-player-content">
                <div class="player-info">
                    <div class="player-artwork" ${settings.music_player_artwork_url ? `style="background-image: url(${settings.music_player_artwork_url});"` : ''}></div>
                    <div class="player-track-info">
                        <div class="player-track-title">${escapeHtml(settings.music_player_track_title || 'Unknown Track')}</div>
                        <div class="player-track-artist">${escapeHtml(settings.music_player_track_artist || 'Unknown Artist')}</div>
                    </div>
                </div>

                <div class="player-controls">
                    <button class="player-btn" id="playerPrev">⏮</button>
                    <button class="player-btn play-pause" id="playerPlayPause">▶</button>
                    <button class="player-btn" id="playerNext">⏭</button>
                </div>

                <div class="player-progress">
                    <span class="player-time" id="currentTime">0:00</span>
                    <div class="progress-bar" id="progressBar">
                        <div class="progress-fill" id="progressFill"></div>
                    </div>
                    <span class="player-time" id="totalTime">0:00</span>
                </div>

                <div class="player-volume">
                    <button class="player-btn" id="volumeBtn">🔊</button>
                    <div class="volume-slider" id="volumeSlider">
                        <div class="volume-fill" id="volumeFill"></div>
                    </div>
                </div>

                <button class="player-close" id="playerClose">✕</button>
            </div>

            <div style="position: absolute; left: -9999px; top: -9999px;">
                <div id="playerEmbed">${processEmbedCode(settings.music_player_url, settings.music_player_type)}</div>
            </div>
        </div>

        <button class="player-toggle" id="playerToggle">🎵</button>
    `;
    
    container.innerHTML = playerHTML;
    initializeMusicPlayerControls();
}

// Process Embed Code
function processEmbedCode(url, type) {
    if (!url) return '';
    
    // If it's already an iframe, return it
    if (url.includes('<iframe')) {
        return url;
    }
    
    // Process different URL types
    switch (type) {
        case 'youtube':
            const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
            if (youtubeMatch) {
                return `<iframe width="100%" height="120" src="https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=0&controls=1" frameborder="0" allowfullscreen></iframe>`;
            }
            break;
        case 'spotify':
            const spotifyMatch = url.match(/spotify\.com\/(album|playlist|track)\/([a-zA-Z0-9]+)/);
            if (spotifyMatch) {
                return `<iframe src="https://open.spotify.com/embed/${spotifyMatch[1]}/${spotifyMatch[2]}" width="100%" height="120" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
            }
            break;
        case 'soundcloud':
            if (url.includes('soundcloud.com')) {
                return `<iframe width="100%" height="120" scrolling="no" frameborder="no" allow="autoplay" src="${url}"></iframe>`;
            }
            break;
        default:
            return url;
    }
    
    return url;
}

// Initialize Music Player Controls
function initializeMusicPlayerControls() {
    const musicPlayer = document.getElementById('musicPlayer');
    const playerToggle = document.getElementById('playerToggle');
    const playPauseBtn = document.getElementById('playerPlayPause');
    const playerClose = document.getElementById('playerClose');
    
    let isPlaying = false;
    let playerVisible = false;
    
    if (!musicPlayer || !playerToggle) return;
    
    // Player toggle
    playerToggle.addEventListener('click', function() {
        if (playerVisible) {
            hidePlayer();
        } else {
            showPlayer();
        }
    });
    
    // Close player
    if (playerClose) {
        playerClose.addEventListener('click', function() {
            hidePlayer();
        });
    }
    
    // Show player
    function showPlayer() {
        musicPlayer.classList.add('active');
        playerToggle.classList.add('hidden');
        playerVisible = true;
        document.body.style.paddingBottom = '120px';
    }
    
    // Hide player
    function hidePlayer() {
        musicPlayer.classList.remove('active');
        playerToggle.classList.remove('hidden');
        playerVisible = false;
        document.body.style.paddingBottom = '0';
    }
    
    // Play/Pause functionality (UI simulation)
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            if (isPlaying) {
                this.textContent = '▶';
                isPlaying = false;
            } else {
                this.textContent = '⏸';
                isPlaying = true;
                startProgressSimulation();
            }
        });
    }
    
    // Simulate progress
    let progressInterval;
    let currentSeconds = 0;
    const totalSeconds = 180; // Default 3 minutes
    
    function startProgressSimulation() {
        clearInterval(progressInterval);
        progressInterval = setInterval(() => {
            if (isPlaying && currentSeconds < totalSeconds) {
                currentSeconds++;
                updateProgress();
            }
        }, 1000);
    }
    
    function updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const currentTimeEl = document.getElementById('currentTime');
        const totalTimeEl = document.getElementById('totalTime');
        
        if (progressFill) {
            const percentage = (currentSeconds / totalSeconds) * 100;
            progressFill.style.width = `${percentage}%`;
        }
        
        if (currentTimeEl) {
            currentTimeEl.textContent = formatTime(currentSeconds);
        }
        
        if (totalTimeEl) {
            totalTimeEl.textContent = formatTime(totalSeconds);
        }
    }
    
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    // Initialize progress display
    updateProgress();
    
    // Auto-show player after 2 seconds
    setTimeout(() => {
        if (!playerVisible) {
            showPlayer();
        }
    }, 2000);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            if (playPauseBtn) {
                playPauseBtn.click();
            }
        } else if (e.code === 'Escape') {
            if (playerVisible) {
                hidePlayer();
            }
        }
    });
}

// Initialize Scroll Effects
function initializeScrollEffects() {
    let lastScrollTop = 0;
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.classList.add('hidden');
        } else {
            // Scrolling up
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });
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

function formatCzechDate(date) {
    const months = [
        'ledna', 'února', 'března', 'dubna', 'května', 'června',
        'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    
    return `${day}. ${month}`;
}

// Global functions for onclick handlers
window.showBandModal = showBandModal;
window.showVinylModal = showVinylModal;
window.orderVinyl = orderVinyl;
window.closeModal = closeModal;
