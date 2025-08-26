<?php get_header(); ?>

<!-- Hero Section -->
<section class="hero">
    <div class="container">
        <h1>U NÁS U 'ŽIVOT JE LAJF' VĚŘÍME, ŽE ŽIVOT JE PŘÍLIŠ KRÁTKÝ NA ŠPATNOU HUDBU.</h1>
        <p>Tak neváhejte a kontaktujte nás ještě dnes. S námi bude vaše akce nezapomenutelná, protože… no, život je lajf!</p>
        <a href="mailto:<?php echo esc_attr(get_theme_mod('zivot_email', 'cau@zivotjelajf.com')); ?>" class="btn btn-primary">Ozvi se nám</a>
    </div>
</section>

<!-- Nejbližší koncerty -->
<section class="section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Nejbližší koncerty</h2>
            <p class="section-intro">Tady bude povídání o nejbližších koncertech co jsou v blízké době.</p>
        </div>
        
        <?php
        $upcoming_events = get_upcoming_events(6);
        if (!empty($upcoming_events)) : ?>
        <div class="grid grid-2">
            <?php foreach ($upcoming_events as $event) :
                $event_date = get_post_meta($event->ID, '_event_date', true);
                $event_time = get_post_meta($event->ID, '_event_time', true);
                $event_venue = get_post_meta($event->ID, '_event_venue', true);
                $event_price = get_post_meta($event->ID, '_event_price', true);
                $band_id = get_post_meta($event->ID, '_event_band', true);
                $band_name = $band_id ? get_the_title($band_id) : $event->post_title;
                $website_url = get_post_meta($event->ID, '_event_website', true);
                $facebook_url = get_post_meta($event->ID, '_event_facebook', true);
                $instagram_url = get_post_meta($event->ID, '_event_instagram', true);
            ?>
            <div class="event-card">
                <div class="event-date"><?php echo esc_html(format_czech_date($event_date)); ?></div>
                <h3 class="event-title"><?php echo esc_html($band_name); ?></h3>
                <p class="event-venue"><?php echo esc_html($event_venue); ?></p>
                
                <div class="event-meta">
                    <div class="event-details">
                        <?php if ($event_time) : ?>
                            <span>Od <?php echo esc_html($event_time); ?></span>
                        <?php endif; ?>
                        <?php if ($event_price) : ?>
                            <span class="event-price"><?php echo esc_html($event_price); ?></span>
                        <?php endif; ?>
                    </div>
                    
                    <div class="social-links">
                        <?php if ($website_url) : ?>
                            <a href="<?php echo esc_url($website_url); ?>" target="_blank" rel="noopener">W</a>
                        <?php endif; ?>
                        <?php if ($facebook_url) : ?>
                            <a href="<?php echo esc_url($facebook_url); ?>" target="_blank" rel="noopener">FB</a>
                        <?php endif; ?>
                        <?php if ($instagram_url) : ?>
                            <a href="<?php echo esc_url($instagram_url); ?>" target="_blank" rel="noopener">IG</a>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
        
        <?php else : ?>
        <!-- Placeholder Events -->
        <div class="grid grid-2">
            <div class="event-card">
                <div class="event-date">19. dubna</div>
                <h3 class="event-title">ACID ROW</h3>
                <p class="event-venue">Rock Café, Praha</p>
                
                <div class="event-meta">
                    <div class="event-details">
                        <span>Od 20:00</span>
                        <span class="event-price">250 Kč</span>
                    </div>
                    
                    <div class="social-links">
                        <a href="#" target="_blank" rel="noopener">W</a>
                        <a href="#" target="_blank" rel="noopener">FB</a>
                        <a href="#" target="_blank" rel="noopener">IG</a>
                    </div>
                </div>
            </div>
            
            <div class="event-card">
                <div class="event-date">20. dubna</div>
                <h3 class="event-title">OOBBT</h3>
                <p class="event-venue">Cross Club, Praha</p>
                
                <div class="event-meta">
                    <div class="event-details">
                        <span>Od 21:00</span>
                    </div>
                    
                    <div class="social-links">
                        <a href="#" target="_blank" rel="noopener">W</a>
                        <a href="#" target="_blank" rel="noopener">FB</a>
                    </div>
                </div>
            </div>
            
            <div class="event-card">
                <div class="event-date">21. dubna</div>
                <h3 class="event-title">KAPELA PIVÍČKO</h3>
                <p class="event-venue">Palác Akropolis, Praha</p>
                
                <div class="event-meta">
                    <div class="event-details">
                        <span>Od 19:30</span>
                        <span class="event-price">180 Kč</span>
                    </div>
                    
                    <div class="social-links">
                        <a href="#" target="_blank" rel="noopener">FB</a>
                        <a href="#" target="_blank" rel="noopener">IG</a>
                    </div>
                </div>
            </div>
            
            <div class="event-card">
                <div class="event-date">22. května</div>
                <h3 class="event-title">ČAU</h3>
                <p class="event-venue">Café V lese, Praha</p>
                
                <div class="event-meta">
                    <div class="event-details">
                        <span>Od 20:00</span>
                        <span class="event-price">150 Kč</span>
                    </div>
                    
                    <div class="social-links">
                        <a href="#" target="_blank" rel="noopener">W</a>
                        <a href="#" target="_blank" rel="noopener">IG</a>
                    </div>
                </div>
            </div>
        </div>
        <?php endif; ?>
        
        <div class="text-center mt-4">
            <a href="<?php echo esc_url(home_url('/koncerty')); ?>" class="btn btn-secondary">KOUKNI NA KONCERTY</a>
        </div>
    </div>
</section>

<!-- Naše kapely -->
<section class="section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">naše kapely</h2>
            <p class="section-intro">Tady bude povídání o našich kapelách</p>
        </div>
        
        <?php
        $bands = get_posts(array(
            'post_type' => 'band',
            'posts_per_page' => 4,
            'orderby' => 'title',
            'order' => 'ASC'
        ));
        
        if (!empty($bands)) : ?>
        <div class="grid grid-4">
            <?php foreach ($bands as $band) :
                $short_description = get_post_meta($band->ID, '_band_short_description', true);
            ?>
            <div class="card band-card">
                <?php if (has_post_thumbnail($band->ID)) : ?>
                    <img src="<?php echo esc_url(get_the_post_thumbnail_url($band->ID, 'band-card')); ?>" alt="<?php echo esc_attr($band->post_title); ?>">
                <?php endif; ?>
                
                <h3 class="band-name"><?php echo esc_html($band->post_title); ?></h3>
                
                <?php if ($short_description) : ?>
                    <p><?php echo esc_html($short_description); ?> <a href="<?php echo esc_url(get_permalink($band->ID)); ?>">Proklik na detail.</a></p>
                <?php endif; ?>
            </div>
            <?php endforeach; ?>
        </div>
        
        <?php else : ?>
        <!-- Placeholder Bands for Homepage -->
        <div class="grid grid-4">
            <div class="card band-card">
                <div style="width: 100%; height: 200px; background: linear-gradient(135deg, #ff4444, #cc0000); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 2.5rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">🎸</div>
                <h3 class="band-name">ACID ROW</h3>
                <p>A three-piece from Prague bringing heavy guitar sounds with melodic vocals. <a href="#" style="color: #ff4444;">Proklik na detail.</a></p>
            </div>
            
            <div class="card band-card">
                <div style="width: 100%; height: 200px; background: linear-gradient(135deg, #8a2be2, #4b0082); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 2.5rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">🎛️</div>
                <h3 class="band-name">OOBBT</h3>
                <p>Experimental electronic duo mixing organic instruments with digital beats. <a href="#" style="color: #ff4444;">Proklik na detail.</a></p>
            </div>
            
            <div class="card band-card">
                <div style="width: 100%; height: 200px; background: linear-gradient(135deg, #ff8c00, #ff4500); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 2.5rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">🍺</div>
                <h3 class="band-name">KAPELA PIVÍČKO</h3>
                <p>Základní info, já nevím co všechno. Asi že jsou dobrý. <a href="#" style="color: #ff4444;">Proklik na detail.</a></p>
            </div>
            
            <div class="card band-card">
                <div style="width: 100%; height: 200px; background: linear-gradient(135deg, #20b2aa, #008b8b); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 2.5rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">🌙</div>
                <h3 class="band-name">ČAU</h3>
                <p>Indie pop projekt s melancholickými melodiemi a poetickými texty. <a href="#" style="color: #ff4444;">Proklik na detail.</a></p>
            </div>
        </div>
        <?php endif; ?>
        
        <div class="text-center mt-4">
            <a href="<?php echo esc_url(home_url('/kapely')); ?>" class="btn btn-secondary">Všechny kapely</a>
        </div>
    </div>
</section>

<!-- Nejnovější vinyly -->
<section class="section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Nejnovější vinyly</h2>
            <p class="section-intro">Tady bude povídání o vinylech</p>
        </div>
        
        <?php
        $vinyls = get_posts(array(
            'post_type' => 'vinyl',
            'posts_per_page' => 6,
            'orderby' => 'date',
            'order' => 'DESC'
        ));
        
        if (!empty($vinyls)) : ?>
        <div class="grid grid-3">
            <?php foreach ($vinyls as $vinyl) :
                $band_id = get_post_meta($vinyl->ID, '_vinyl_band', true);
                $band_name = $band_id ? get_the_title($band_id) : '';
            ?>
            <div class="card vinyl-card">
                <?php if (has_post_thumbnail($vinyl->ID)) : ?>
                    <img src="<?php echo esc_url(get_the_post_thumbnail_url($vinyl->ID, 'vinyl-card')); ?>" alt="<?php echo esc_attr($vinyl->post_title); ?>">
                <?php endif; ?>
                
                <h3 class="vinyl-title"><?php echo esc_html($vinyl->post_title); ?></h3>
                <?php if ($band_name) : ?>
                    <p class="small-text"><?php echo esc_html($band_name); ?></p>
                <?php endif; ?>
                
                <p><?php echo wp_trim_words(get_the_excerpt($vinyl->ID), 15); ?> <a href="<?php echo esc_url(get_permalink($vinyl->ID)); ?>">Proklik na detail.</a></p>
                
                <div class="vinyl-actions mt-2">
                    <?php zivot_vinyl_buy_button($vinyl->ID); ?>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
        
        <?php else : ?>
        <!-- Placeholder Vinyls for Homepage -->
        <div class="grid grid-3">
            <div class="card vinyl-card">
                <div style="width: 100%; height: 250px; background: linear-gradient(45deg, #ff4444, #8B0000, #2F4F4F); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; position: relative; overflow: hidden;">
                    <div style="position: absolute; width: 200px; height: 200px; border: 3px solid rgba(255,255,255,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <div style="width: 30px; height: 30px; background: rgba(255,255,255,0.5); border-radius: 50%;"></div>
                    </div>
                    <div style="position: absolute; bottom: 10px; right: 10px; background: #ff4444; padding: 3px 8px; border-radius: 4px; font-size: 0.7rem;">ACID ROW</div>
                </div>
                <h3 class="vinyl-title">POISONED MIND / ACID ROW</h3>
                <p class="small-text">ACID ROW</p>
                <p>Povídání o vinylu, jak vznikl nebo já nevím co všechno. <a href="#" style="color: #ff4444;">Proklik na detail.</a></p>
                <div class="vinyl-actions mt-2">
                    <a href="mailto:cau@zivotjelajf.com?subject=Objednávka - ACID ROW vinyl" class="btn btn-primary">Kup vinyl - 450 Kč</a>
                </div>
            </div>
            
            <div class="card vinyl-card">
                <div style="width: 100%; height: 250px; background: linear-gradient(45deg, #8a2be2, #4b0082, #191970); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; position: relative; overflow: hidden;">
                    <div style="position: absolute; width: 200px; height: 200px; border: 3px solid rgba(255,255,255,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <div style="width: 30px; height: 30px; background: rgba(255,255,255,0.5); border-radius: 50%;"></div>
                    </div>
                    <div style="position: absolute; bottom: 10px; right: 10px; background: #8a2be2; padding: 3px 8px; border-radius: 4px; font-size: 0.7rem;">OOBBT</div>
                </div>
                <h3 class="vinyl-title">ELECTRONIC DREAMS</h3>
                <p class="small-text">OOBBT</p>
                <p>Povídání o vinylu, jak vznikl. <a href="#" style="color: #ff4444;">Proklik na detail.</a></p>
                <div class="vinyl-actions mt-2">
                    <a href="mailto:cau@zivotjelajf.com?subject=Objednávka - OOBBT vinyl" class="btn btn-primary">Kup vinyl - 380 Kč</a>
                </div>
            </div>
            
            <div class="card vinyl-card">
                <div style="width: 100%; height: 250px; background: linear-gradient(45deg, #ff8c00, #ff4500, #8B4513); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; position: relative; overflow: hidden;">
                    <div style="position: absolute; width: 200px; height: 200px; border: 3px solid rgba(255,255,255,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <div style="width: 30px; height: 30px; background: rgba(255,255,255,0.5); border-radius: 50%;"></div>
                    </div>
                    <div style="position: absolute; bottom: 10px; right: 10px; background: #ff8c00; padding: 3px 8px; border-radius: 4px; font-size: 0.7rem;">PIVÍČKO</div>
                </div>
                <h3 class="vinyl-title">PIVNÍ SEZÓNA</h3>
                <p class="small-text">KAPELA PIVÍČKO</p>
                <p>Povídání o vinylu, jak vznikl. <a href="#" style="color: #ff4444;">Proklik na detail.</a></p>
                <div class="vinyl-actions mt-2">
                    <a href="mailto:cau@zivotjelajf.com?subject=Objednávka - KAPELA PIVÍČKO vinyl" class="btn btn-primary">Kup vinyl - 320 Kč</a>
                </div>
            </div>
        </div>
        <?php endif; ?>
        
        <div class="text-center mt-4">
            <a href="<?php echo esc_url(home_url('/vinyly')); ?>" class="btn btn-secondary">Koukni na všechny vinyly</a>
            <a href="mailto:<?php echo esc_attr(get_theme_mod('zivot_email', 'cau@zivotjelajf.com')); ?>?subject=Chceš udělat vinyl?" class="btn btn-primary">Chceš udělat vinyl?</a>
        </div>
    </div>
</section>

<?php get_footer(); ?>
