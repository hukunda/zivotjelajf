</main>

<footer class="site-footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-contact">
                <p><strong>"Call me maybe?"</strong><br>
                <?php echo esc_html(get_theme_mod('zivot_phone', '+420 727 273 372')); ?></p>
                
                <p><strong>"Email"</strong><br>
                <a href="mailto:<?php echo esc_attr(get_theme_mod('zivot_email', 'cau@zivotjelajf.com')); ?>">
                    <?php echo esc_html(get_theme_mod('zivot_email', 'cau@zivotjelajf.com')); ?>
                </a></p>
            </div>
            
            <div class="footer-form">
                <h3>Čau s náma?</h3>
                <form id="footer-email-form">
                    <div class="form-group">
                        <input type="email" name="email" placeholder="Tvůj mail" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Napiš</button>
                </form>
                <div id="form-message" style="display: none;"></div>
            </div>
            
            <div class="footer-social">
                <div class="social-links">
                    <?php if (get_theme_mod('zivot_facebook')) : ?>
                        <a href="<?php echo esc_url(get_theme_mod('zivot_facebook')); ?>" target="_blank" rel="noopener">
                            <span>FB</span>
                        </a>
                    <?php endif; ?>
                    
                    <?php if (get_theme_mod('zivot_instagram')) : ?>
                        <a href="<?php echo esc_url(get_theme_mod('zivot_instagram')); ?>" target="_blank" rel="noopener">
                            <span>IG</span>
                        </a>
                    <?php endif; ?>
                    
                    <?php if (get_theme_mod('zivot_twitter')) : ?>
                        <a href="<?php echo esc_url(get_theme_mod('zivot_twitter')); ?>" target="_blank" rel="noopener">
                            <span>TW</span>
                        </a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; <?php echo date('Y'); ?> Život je lajf. Všechna práva vyhrazena.</p>
        </div>
    </div>
</footer>

<?php
// Include music player if enabled
$player_enabled = get_option('zivot_player_enabled', '0');
if ($player_enabled == '1') :
    $player_url = get_option('zivot_player_url', '');
    $player_type = get_option('zivot_player_type', 'bandcamp');
    $track_title = get_option('zivot_player_track_title', 'Unknown Track');
    $track_artist = get_option('zivot_player_track_artist', 'Unknown Artist');
    $artwork_url = get_option('zivot_player_artwork_url', '');
    
    if (!empty($player_url)) :
?>

<!-- Sticky Music Player -->
<div class="music-player-bar" id="musicPlayer">
    <div class="music-player-content">
        <div class="player-info">
            <div class="player-artwork" <?php if ($artwork_url) echo 'style="background-image: url(' . esc_url($artwork_url) . ');"'; ?>></div>
            <div class="player-track-info">
                <div class="player-track-title"><?php echo esc_html($track_title); ?></div>
                <div class="player-track-artist"><?php echo esc_html($track_artist); ?></div>
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
    
    <!-- Hidden embed container -->
    <div style="position: absolute; left: -9999px; top: -9999px;">
        <div id="playerEmbed">
            <?php echo zivot_process_music_embed($player_url, $player_type); ?>
        </div>
    </div>
</div>

<!-- Player Toggle Button -->
<button class="player-toggle" id="playerToggle">🎵</button>

<?php endif; endif; ?>

<?php wp_footer(); ?>

<script>
jQuery(document).ready(function($) {
    $('#footer-email-form').on('submit', function(e) {
        e.preventDefault();
        
        var email = $(this).find('input[name="email"]').val();
        var messageDiv = $('#form-message');
        
        $.ajax({
            url: zivot_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'footer_email_form',
                email: email,
                nonce: zivot_ajax.nonce
            },
            success: function(response) {
                if (response.success) {
                    messageDiv.html('<p style="color: #4CAF50;">' + response.data + '</p>').show();
                    $('#footer-email-form')[0].reset();
                } else {
                    messageDiv.html('<p style="color: #ff4444;">' + response.data + '</p>').show();
                }
            },
            error: function() {
                messageDiv.html('<p style="color: #ff4444;">Chyba při odesílání. Zkuste to prosím znovu.</p>').show();
            }
        });
    });
});
</script>

</body>
</html>
