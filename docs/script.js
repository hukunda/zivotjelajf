// Modern Život je lajf Website JavaScript

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeNavigation();
    initializeHero();
    initializeAnimations();
    initializeMusicPlayer();
    initializeForms();
    initializeScrollEffects();
    initializeProgressiveCalendar();
    
    // Hide loading screen
    hideLoadingScreen();
    
    // Console easter egg
    console.log('%c🎸 Život je lajf!', 'color: #ff3366; font-size: 24px; font-weight: bold;');
    console.log('%cModern Underground Music Management', 'color: #ffaa00; font-size: 14px;');
    console.log('%c🔥 Powered by passion for great music', 'color: #00ffaa; font-size: 12px;');
}

// ==========================================
// LOADING SCREEN
// ==========================================

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            document.body.classList.remove('loading');
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 2000);
    }
}

// ==========================================
// NAVIGATION
// ==========================================

function initializeNavigation() {
    const nav = document.getElementById('mainNav');
    const navBurger = document.getElementById('navBurger');
    const navMenu = document.getElementById('navMenu');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Burger menu toggle
    if (navBurger && navMenu) {
        navBurger.addEventListener('click', function() {
            navBurger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking nav item
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navBurger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Navigation scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Hide/show nav on scroll (optional)
        if (currentScroll > lastScroll && currentScroll > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Active nav item highlighting (for single page)
    highlightActiveNavItem();
}

function highlightActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            item.classList.add('active');
        }
    });
}

// ==========================================
// HERO SECTION
// ==========================================

function initializeHero() {
    const hero = document.getElementById('hero');
    if (!hero) return;
    
    // Parallax effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const heroBackground = hero.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Statistics counter animation
    animateStatistics();
    
    // Hero title typing effect (optional)
    animateHeroTitle();
}

function animateStatistics() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 50);
}

function animateHeroTitle() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    // Add typewriter effect
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 1000);
}

// ==========================================
// ANIMATIONS & MICROINTERACTIONS
// ==========================================

function initializeAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.preview-card, .stat-item');
    animatedElements.forEach(el => {
        observer.observe(el);
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Add animate-in styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Card hover effects
    initializeCardEffects();
    
    // Button ripple effects
    initializeButtonEffects();
}

function initializeCardEffects() {
    const cards = document.querySelectorAll('.preview-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add tilt effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-12px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });
}

function initializeButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// ==========================================
// PROGRESSIVE CALENDAR
// ==========================================

function initializeProgressiveCalendar() {
    const concertSection = document.querySelector('.home-concerts');
    const hiddenEvents = document.querySelectorAll('.concert-hidden');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (!concertSection || hiddenEvents.length === 0) {
        console.log('Progressive calendar: No elements found');
        return;
    }
    
    console.log(`Progressive calendar: Found ${hiddenEvents.length} hidden events`);
    
    let eventsRevealed = false;
    
    const revealEvents = () => {
        if (eventsRevealed) return;
        
        console.log('Revealing concert events...');
        
        hiddenEvents.forEach((event, index) => {
            setTimeout(() => {
                event.classList.remove('concert-hidden');
                event.classList.add('concert-revealed');
                console.log(`Revealed event ${index + 1}`);
            }, index * 150); // Stagger the animations
        });
        
        if (scrollIndicator) {
            setTimeout(() => {
                scrollIndicator.classList.add('hidden');
            }, hiddenEvents.length * 150 + 500);
        }
        
        eventsRevealed = true;
    };
    
    // Intersection Observer for scroll-triggered reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const rect = entry.boundingClientRect;
                const windowHeight = window.innerHeight;
                
                // Trigger when section is 70% visible
                if (rect.top < windowHeight * 0.7) {
                    revealEvents();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -20% 0px'
    });
    
    observer.observe(concertSection);
    
    // Also reveal on manual scroll past a certain point
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollPosition = window.scrollY;
            const triggerPoint = window.innerHeight * 0.6;
            
            if (scrollPosition > triggerPoint) {
                revealEvents();
            }
        }, 100);
    });
}

// ==========================================
// MUSIC PLAYER
// ==========================================

function initializeMusicPlayer() {
    const musicPlayer = document.getElementById('musicPlayer');
    const playPauseBtn = document.getElementById('playerPlayPause');
    const prevBtn = document.getElementById('playerPrev');
    const nextBtn = document.getElementById('playerNext');
    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeFill = document.getElementById('volumeFill');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');
    const closeBtn = document.getElementById('playerClose');
    
    if (!musicPlayer) return;
    
    let isPlaying = false;
    let currentTime = 0;
    let duration = 225; // 3:45 in seconds
    let volume = 0.7;
    let playInterval;
    
    // Show player after delay
    setTimeout(() => {
        musicPlayer.classList.add('active');
        document.body.style.paddingBottom = '120px';
    }, 3000);
    
    // Play/Pause functionality
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            isPlaying = !isPlaying;
            this.textContent = isPlaying ? '⏸' : '▶';
            
            if (isPlaying) {
                startPlayback();
            } else {
                stopPlayback();
            }
        });
    }
    
    // Previous/Next buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentTime = Math.max(0, currentTime - 10);
            updateProgress();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentTime = Math.min(duration, currentTime + 10);
            updateProgress();
        });
    }
    
    // Progress bar interaction
    if (progressBar) {
        progressBar.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            currentTime = percent * duration;
            updateProgress();
        });
    }
    
    // Volume control
    if (volumeSlider) {
        volumeSlider.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            volume = (e.clientX - rect.left) / rect.width;
            updateVolume();
        });
    }
    
    // Close player
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            musicPlayer.classList.remove('active');
            document.body.style.paddingBottom = '0';
            stopPlayback();
        });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            playPauseBtn.click();
        }
    });
    
    function startPlayback() {
        playInterval = setInterval(() => {
            currentTime += 1;
            if (currentTime >= duration) {
                currentTime = 0;
                isPlaying = false;
                playPauseBtn.textContent = '▶';
                clearInterval(playInterval);
            }
            updateProgress();
        }, 1000);
    }
    
    function stopPlayback() {
        if (playInterval) {
            clearInterval(playInterval);
        }
    }
    
    function updateProgress() {
        const percent = (currentTime / duration) * 100;
        if (progressFill) {
            progressFill.style.width = `${percent}%`;
        }
        if (currentTimeEl) {
            currentTimeEl.textContent = formatTime(currentTime);
        }
    }
    
    function updateVolume() {
        const percent = volume * 100;
        if (volumeFill) {
            volumeFill.style.width = `${percent}%`;
        }
    }
    
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    // Initialize display
    updateProgress();
    updateVolume();
}

// ==========================================
// FORMS
// ==========================================

function initializeForms() {
    const subscribeForm = document.getElementById('email-subscribe-form');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('subscribe-email');
            const messageDiv = document.getElementById('subscribe-message');
            const email = emailInput.value.trim();
            
            if (!email || !isValidEmail(email)) {
                showMessage(messageDiv, 'Zadejte platnou email adresu', 'error');
                return;
            }
            
            // Simulate form submission
            showMessage(messageDiv, 'Děkujeme za registraci!', 'success');
            emailInput.value = '';
            
            // In production, send to server
            console.log('Email subscription:', email);
        });
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showMessage(element, message, type) {
    if (!element) return;
    
    element.textContent = message;
    element.className = `subscribe-message ${type}`;
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    
    setTimeout(() => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            element.textContent = '';
            element.className = 'subscribe-message';
        }, 300);
    }, 4000);
}

// ==========================================
// SCROLL EFFECTS
// ==========================================

function initializeScrollEffects() {
    // Smooth scrolling for hash links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll indicator in hero
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const nextSection = document.querySelector('.preview-grid');
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // Hide scroll indicator when scrolled
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            scrollIndicator.style.opacity = scrolled > 100 ? '0' : '1';
        });
    }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ==========================================
// ERROR HANDLING
// ==========================================

window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// ==========================================
// PERFORMANCE MONITORING
// ==========================================

// Log performance metrics
window.addEventListener('load', function() {
    setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    }, 0);
});

// ==========================================
// EXPORT FOR TESTING
// ==========================================

// For testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        formatTime: (seconds) => {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        },
        isValidEmail
    };
}