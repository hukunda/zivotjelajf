// Static version for GitHub Pages
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    initializeNavigation();
    initializeForms();
    initializeMusicPlayer();
    hideLoadingScreen();
    
    // Console easter egg
    console.log('%cŽivot je lajf!', 'color: #ff4444; font-size: 24px; font-weight: bold;');
    console.log('%cTato je GitHub Pages demo verze! 🎸', 'color: #b8c5d1; font-size: 14px;');
    console.log('%cKompletní verze: https://github.com/hukunda/zivotjelajf', 'color: #ff4444; font-size: 14px;');
}

// Hide Loading Screen
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1500);
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
            
            // Update active nav
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Simple scroll to section for demo
            const targetSection = document.getElementById(target);
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Mobile menu toggle
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Scroll spy for navigation
    window.addEventListener('scroll', function() {
        const sections = ['home', 'nejblizsi-koncerty', 'nase-kapely', 'nejnovejsi-vinyly'];
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    });
    
    // Header hide/show on scroll
    let lastScrollTop = 0;
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
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

// Initialize Forms
function initializeForms() {
    // Email subscription form
    const subscribeForm = document.getElementById('email-subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('subscribe-email');
            const messageDiv = document.getElementById('subscribe-message');
            const email = emailInput.value.trim();
            
            if (!email) {
                showMessage(messageDiv, 'Zadejte email adresu', 'error');
                return;
            }
            
            // Simulate subscription for demo
            showMessage(messageDiv, 'Demo verze - v produkční verzi by byl email uložen!', 'success');
            emailInput.value = '';
            
            // In real version, this would send to server
            console.log('Demo: Email subscription:', email);
        });
    }
}

// Initialize Music Player
function initializeMusicPlayer() {
    const musicPlayer = document.getElementById('musicPlayer');
    const playPauseBtn = document.getElementById('playerPlayPause');
    const playerClose = document.getElementById('playerClose');
    
    let isPlaying = false;
    
    if (!musicPlayer) return;
    
    // Play/Pause functionality (demo simulation)
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            if (isPlaying) {
                this.textContent = '▶';
                isPlaying = false;
                console.log('Demo: Music paused');
            } else {
                this.textContent = '⏸';
                isPlaying = true;
                console.log('Demo: Music playing');
                simulateProgress();
            }
        });
    }
    
    // Close player
    if (playerClose) {
        playerClose.addEventListener('click', function() {
            musicPlayer.classList.remove('active');
            document.body.style.paddingBottom = '0';
        });
    }
    
    // Simulate progress
    function simulateProgress() {
        if (!isPlaying) return;
        
        const progressFill = document.getElementById('progressFill');
        const currentTimeEl = document.getElementById('currentTime');
        
        if (progressFill && currentTimeEl) {
            let currentWidth = parseFloat(progressFill.style.width) || 45;
            
            const interval = setInterval(() => {
                if (!isPlaying) {
                    clearInterval(interval);
                    return;
                }
                
                currentWidth += 0.5;
                if (currentWidth >= 100) {
                    currentWidth = 0;
                }
                
                progressFill.style.width = currentWidth + '%';
                
                // Update time display
                const totalSeconds = 225; // 3:45
                const currentSeconds = Math.floor((currentWidth / 100) * totalSeconds);
                currentTimeEl.textContent = formatTime(currentSeconds);
            }, 1000);
        }
    }
    
    // Progress bar click
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width * 100;
            const progressFill = document.getElementById('progressFill');
            if (progressFill) {
                progressFill.style.width = percent + '%';
            }
        });
    }
    
    // Volume control
    const volumeSlider = document.getElementById('volumeSlider');
    if (volumeSlider) {
        volumeSlider.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width * 100;
            const volumeFill = document.getElementById('volumeFill');
            if (volumeFill) {
                volumeFill.style.width = percent + '%';
            }
        });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            if (playPauseBtn) {
                playPauseBtn.click();
            }
        } else if (e.code === 'Escape') {
            if (musicPlayer && musicPlayer.classList.contains('active')) {
                playerClose.click();
            }
        }
    });
    
    // Auto-show player (demo)
    setTimeout(() => {
        if (musicPlayer) {
            musicPlayer.classList.add('active');
            document.body.style.paddingBottom = '120px';
        }
    }, 3000);
}

// Show Message
function showMessage(element, message, type) {
    if (!element) return;
    
    element.textContent = message;
    element.className = `subscribe-message ${type}`;
    
    setTimeout(() => {
        element.textContent = '';
        element.className = 'subscribe-message';
    }, 5000);
}

// Format Time
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Demo functionality for links
document.addEventListener('click', function(e) {
    const target = e.target;
    
    // Handle demo links
    if (target.matches('a[href="#"]')) {
        e.preventDefault();
        console.log('Demo: Link clicked -', target.textContent);
        
        // Show demo message
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ff4444, #ff6666);
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
        `;
        message.textContent = 'Demo verze - kompletní funkcionalita je k dispozici v plné verzi!';
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 3000);
    }
    
    // Handle mailto links
    if (target.matches('a[href^="mailto:"]')) {
        console.log('Demo: Email link clicked -', target.href);
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add some demo interactivity to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Add loading animations
window.addEventListener('load', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
