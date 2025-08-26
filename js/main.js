jQuery(document).ready(function($) {
    
    // Mobile menu toggle
    $('.mobile-menu-toggle').on('click', function(e) {
        e.preventDefault();
        $('.main-nav').toggleClass('mobile-open');
        $(this).toggleClass('active');
    });
    
    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        var target = this.hash;
        var $target = $(target);
        
        if ($target.length) {
            $('html, body').animate({
                'scrollTop': $target.offset().top - 80
            }, 600, 'swing');
        }
    });
    
    // Form validation and enhancement
    $('.form-field input, .form-field textarea').on('focus', function() {
        $(this).parent().addClass('focused');
    }).on('blur', function() {
        if (!$(this).val()) {
            $(this).parent().removeClass('focused');
        }
    });
    
    // Add loading states to buttons
    $('.btn').on('click', function() {
        var $btn = $(this);
        if (!$btn.hasClass('loading')) {
            $btn.addClass('loading');
            setTimeout(function() {
                $btn.removeClass('loading');
            }, 2000);
        }
    });
    
    // Image lazy loading fallback
    $('img[data-src]').each(function() {
        var img = $(this);
        img.attr('src', img.data('src')).removeAttr('data-src');
    });
    
    // Event card hover effects
    $('.event-card').hover(
        function() {
            $(this).addClass('hovered');
        },
        function() {
            $(this).removeClass('hovered');
        }
    );
    
    // Band and vinyl card hover effects
    $('.band-card, .vinyl-card').hover(
        function() {
            $(this).find('img').addClass('zoomed');
        },
        function() {
            $(this).find('img').removeClass('zoomed');
        }
    );
    
    // Auto-hide alerts/messages after 5 seconds
    $('.alert, .notice').delay(5000).fadeOut();
    
    // Scroll to top functionality
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });
    
    $('.scroll-to-top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 600);
    });
    
    // Add scroll to top button if it doesn't exist
    if (!$('.scroll-to-top').length) {
        $('body').append('<a href="#" class="scroll-to-top" style="position: fixed; bottom: 20px; right: 20px; background: #ff4444; color: #fff; width: 50px; height: 50px; border-radius: 50%; display: none; align-items: center; justify-content: center; text-decoration: none; z-index: 1000;">↑</a>');
    }
    
    // Table responsive wrapper
    $('.events-table').wrap('<div class="table-responsive"></div>');
    
    // Add animation classes when elements come into view
    function animateOnScroll() {
        $('.card, .event-card, .band-card, .vinyl-card').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate-in');
            }
        });
    }
    
    // Run animation check on scroll and load
    $(window).on('scroll resize', animateOnScroll);
    animateOnScroll();
    
    // Enhanced social links functionality
    $('.social-links a').hover(
        function() {
            $(this).addClass('pulse');
        },
        function() {
            $(this).removeClass('pulse');
        }
    );
    
    // Copy to clipboard functionality for contact info
    $('.contact-copy').on('click', function(e) {
        e.preventDefault();
        var text = $(this).data('text') || $(this).text();
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function() {
                showMessage('Zkopírováno do schránky!', 'success');
            });
        } else {
            // Fallback for older browsers
            var textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showMessage('Zkopírováno do schránky!', 'success');
        }
    });
    
    // Message display function
    function showMessage(text, type) {
        var messageClass = type === 'success' ? 'success' : 'error';
        var messageColor = type === 'success' ? '#4CAF50' : '#ff4444';
        
        var $message = $('<div class="toast-message" style="position: fixed; top: 20px; right: 20px; background: ' + messageColor + '; color: white; padding: 15px 20px; border-radius: 4px; z-index: 10000; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">' + text + '</div>');
        
        $('body').append($message);
        
        setTimeout(function() {
            $message.fadeOut(function() {
                $(this).remove();
            });
        }, 3000);
    }
    
    // Enhanced form handling for better UX
    $('form').on('submit', function() {
        var $form = $(this);
        var $submitBtn = $form.find('button[type="submit"], input[type="submit"]');
        
        // Disable submit button to prevent double submission
        $submitBtn.prop('disabled', true).addClass('loading');
        
        // Re-enable after 3 seconds as fallback
        setTimeout(function() {
            $submitBtn.prop('disabled', false).removeClass('loading');
        }, 3000);
    });
    
    // External link handling
    $('a[href^="http"]').not('[href*="' + location.hostname + '"]').attr({
        target: '_blank',
        rel: 'noopener noreferrer'
    });
    
    // Music Player Functionality
    var musicPlayer = $('#musicPlayer');
    var playerToggle = $('#playerToggle');
    var playPauseBtn = $('#playerPlayPause');
    var playerClose = $('#playerClose');
    var isPlaying = false;
    var playerVisible = false;
    
    // Player toggle
    playerToggle.on('click', function() {
        if (playerVisible) {
            hidePlayer();
        } else {
            showPlayer();
        }
    });
    
    // Close player
    playerClose.on('click', function() {
        hidePlayer();
    });
    
    // Show player
    function showPlayer() {
        musicPlayer.addClass('active');
        playerToggle.addClass('hidden');
        playerVisible = true;
        
        // Add bottom padding to body to prevent content overlap
        $('body').css('padding-bottom', '120px');
    }
    
    // Hide player
    function hidePlayer() {
        musicPlayer.removeClass('active');
        playerToggle.removeClass('hidden');
        playerVisible = false;
        
        // Remove bottom padding
        $('body').css('padding-bottom', '0');
    }
    
    // Play/Pause functionality
    playPauseBtn.on('click', function() {
        if (isPlaying) {
            playPauseBtn.text('▶');
            isPlaying = false;
            // Note: Due to iframe restrictions, we can't actually control embedded players
            // This is just UI feedback - actual playback control happens in the embed
        } else {
            playPauseBtn.text('⏸');
            isPlaying = true;
            startProgressSimulation();
        }
    });
    
    // Simulate progress (since we can't access iframe player data)
    var progressInterval;
    var currentSeconds = 0;
    var totalSeconds = 180; // Default 3 minutes
    
    function startProgressSimulation() {
        clearInterval(progressInterval);
        progressInterval = setInterval(function() {
            if (isPlaying && currentSeconds < totalSeconds) {
                currentSeconds++;
                updateProgress();
            } else if (currentSeconds >= totalSeconds) {
                // Track ended
                playPauseBtn.text('▶');
                isPlaying = false;
                currentSeconds = 0;
                updateProgress();
                clearInterval(progressInterval);
            }
        }, 1000);
    }
    
    function updateProgress() {
        var progressPercent = (currentSeconds / totalSeconds) * 100;
        $('#progressFill').css('width', progressPercent + '%');
        $('#currentTime').text(formatTime(currentSeconds));
        $('#totalTime').text(formatTime(totalSeconds));
    }
    
    function formatTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        var secs = seconds % 60;
        return minutes + ':' + (secs < 10 ? '0' : '') + secs;
    }
    
    // Progress bar click
    $('#progressBar').on('click', function(e) {
        var clickX = e.offsetX;
        var width = $(this).width();
        var newPercent = (clickX / width) * 100;
        currentSeconds = Math.floor((newPercent / 100) * totalSeconds);
        updateProgress();
    });
    
    // Volume controls
    var currentVolume = 70;
    
    $('#volumeSlider').on('click', function(e) {
        var clickX = e.offsetX;
        var width = $(this).width();
        currentVolume = (clickX / width) * 100;
        $('#volumeFill').css('width', currentVolume + '%');
        
        // Update volume icon
        var volumeBtn = $('#volumeBtn');
        if (currentVolume === 0) {
            volumeBtn.text('🔇');
        } else if (currentVolume < 30) {
            volumeBtn.text('🔈');
        } else if (currentVolume < 70) {
            volumeBtn.text('🔉');
        } else {
            volumeBtn.text('🔊');
        }
    });
    
    // Volume button toggle
    $('#volumeBtn').on('click', function() {
        if (currentVolume > 0) {
            currentVolume = 0;
            $(this).text('🔇');
        } else {
            currentVolume = 70;
            $(this).text('🔊');
        }
        $('#volumeFill').css('width', currentVolume + '%');
    });
    
    // Previous/Next buttons (placeholder functionality)
    $('#playerPrev').on('click', function() {
        // Reset to beginning
        currentSeconds = 0;
        updateProgress();
    });
    
    $('#playerNext').on('click', function() {
        // Skip to end (or next track if playlist)
        currentSeconds = totalSeconds;
        updateProgress();
        playPauseBtn.text('▶');
        isPlaying = false;
        clearInterval(progressInterval);
    });
    
    // Initialize progress display
    updateProgress();
    
    // Auto-show player on page load if enabled
    if (musicPlayer.length && !playerVisible) {
        setTimeout(function() {
            showPlayer();
        }, 2000); // Show after 2 seconds
    }
    
    // Keyboard shortcuts
    $(document).on('keydown', function(e) {
        // Spacebar to play/pause (when not in input field)
        if (e.keyCode === 32 && !$('input, textarea').is(':focus') && playerVisible) {
            e.preventDefault();
            playPauseBtn.click();
        }
        
        // Escape to close player
        if (e.keyCode === 27 && playerVisible) {
            hidePlayer();
        }
    });
    
    // Player info hover effects
    $('.player-track-info').on('click', function() {
        // Optional: Could scroll to current band/vinyl page
        var artistName = $('.player-track-artist').text();
        if (artistName && artistName !== 'Unknown Artist') {
            // Try to find band page
            var bandLink = $('a:contains("' + artistName + '")').first();
            if (bandLink.length) {
                window.location.href = bandLink.attr('href');
            }
        }
    });
    
    // Enhanced player controls with visual feedback
    $('.player-btn').on('mousedown', function() {
        $(this).css('transform', 'scale(0.95)');
    }).on('mouseup mouseleave', function() {
        $(this).css('transform', '');
    });
    
    // Mobile responsiveness adjustments
    function adjustPlayerForMobile() {
        if ($(window).width() <= 768) {
            // Adjust player for mobile
            if (playerVisible) {
                $('body').css('padding-bottom', '160px'); // More space on mobile
            }
        } else {
            if (playerVisible) {
                $('body').css('padding-bottom', '120px'); // Normal space on desktop
            }
        }
    }
    
    $(window).on('resize', adjustPlayerForMobile);
    adjustPlayerForMobile();
    
    // Console easter egg
    console.log('%cŽivot je lajf!', 'color: #ff4444; font-size: 24px; font-weight: bold;');
    console.log('%cHledáš něco v kódu? 😉 Možná bys měl/a kontaktovat nás na cau@zivotjelajf.com', 'color: #b8c5d1; font-size: 14px;');
    console.log('%c🎵 Music Player aktivní!', 'color: #ff4444; font-size: 14px;');
    
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    .card, .event-card, .band-card, .vinyl-card {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .band-card img, .vinyl-card img {
        transition: transform 0.3s ease;
    }
    
    .band-card img.zoomed, .vinyl-card img.zoomed {
        transform: scale(1.05);
    }
    
    .event-card {
        transition: all 0.3s ease;
    }
    
    .event-card.hovered {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
    }
    
    .social-links a.pulse {
        animation: pulse 0.6s ease-in-out;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .btn.loading {
        opacity: 0.7;
        pointer-events: none;
    }
    
    .btn.loading::after {
        content: '...';
        animation: loading 1s infinite;
    }
    
    @keyframes loading {
        0% { content: ''; }
        25% { content: '.'; }
        50% { content: '..'; }
        75% { content: '...'; }
        100% { content: ''; }
    }
    
    .table-responsive {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }
    
    @media (max-width: 768px) {
        .events-table {
            font-size: 0.875rem;
        }
        
        .events-table th,
        .events-table td {
            padding: 0.5rem;
        }
    }
`;
document.head.appendChild(style);
