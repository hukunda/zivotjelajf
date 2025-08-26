<?php get_header(); ?>

<section class="section">
    <div class="container">
        <div class="section-header">
            <h1 class="section-title">O KAPELÁCH</h1>
            <p class="section-intro">Tady bude povídání o našich kapelách</p>
        </div>
        
        <?php
        $bands = get_posts(array(
            'post_type' => 'band',
            'posts_per_page' => -1,
            'orderby' => 'title',
            'order' => 'ASC'
        ));
        
        if (!empty($bands)) : ?>
        <div class="grid grid-3">
            <?php foreach ($bands as $band) :
                setup_postdata($band);
                $short_description = get_post_meta($band->ID, '_band_short_description', true);
                $booking_url = get_post_meta($band->ID, '_band_booking_url', true);
            ?>
            <div class="card band-card">
                <?php if (has_post_thumbnail($band->ID)) : ?>
                    <img src="<?php echo esc_url(get_the_post_thumbnail_url($band->ID, 'band-card')); ?>" alt="<?php echo esc_attr($band->post_title); ?>">
                <?php endif; ?>
                
                <h3 class="band-name"><?php echo esc_html($band->post_title); ?></h3>
                
                <?php if ($short_description) : ?>
                    <p><?php echo esc_html($short_description); ?></p>
                <?php endif; ?>
                
                <p><a href="<?php echo esc_url(get_permalink($band->ID)); ?>">Proklik na detail.</a></p>
                
                <?php if ($booking_url) : ?>
                    <a href="<?php echo esc_url($booking_url); ?>" class="btn btn-primary" target="_blank" rel="noopener">BOOKUJ!</a>
                <?php endif; ?>
            </div>
            <?php endforeach; wp_reset_postdata(); ?>
        </div>
        
        <?php else : ?>
        
        <!-- Placeholder Content - Remove this section once you add real bands -->
        <div class="grid grid-3">
            <div class="card band-card">
                <div style="width: 100%; height: 200px; background: linear-gradient(45deg, #2a3441, #1a2332); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: #ff4444; font-size: 3rem;">🎸</div>
                <h3 class="band-name">ACID ROW</h3>
                <p>A three-piece from Prague that brings heavy guitar sounds with melodic vocals. Known for their energetic live performances and original compositions.</p>
                <p><a href="#" style="color: #ff4444;">Proklik na detail.</a></p>
                <a href="mailto:cau@zivotjelajf.com?subject=Booking ACID ROW" class="btn btn-primary">BOOKUJ!</a>
            </div>
            
            <div class="card band-card">
                <div style="width: 100%; height: 200px; background: linear-gradient(45deg, #2a3441, #1a2332); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: #ff4444; font-size: 3rem;">🥁</div>
                <h3 class="band-name">OOBBT</h3>
                <p>Experimental electronic duo mixing organic instruments with digital beats. Creating unique soundscapes for the modern underground scene.</p>
                <p><a href="#" style="color: #ff4444;">Proklik na detail.</a></p>
                <a href="mailto:cau@zivotjelajf.com?subject=Booking OOBBT" class="btn btn-primary">BOOKUJ!</a>
            </div>
            
            <div class="card band-card">
                <div style="width: 100%; height: 200px; background: linear-gradient(45deg, #2a3441, #1a2332); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: #ff4444; font-size: 3rem;">🎤</div>
                <h3 class="band-name">KAPELA PIVÍČKO</h3>
                <p>Základní info, já nevím co všechno. Asi že jsou dobrý. Alternative rock band s vtipnými texty a skvělou atmosférou na koncertech.</p>
                <p><a href="#" style="color: #ff4444;">Proklik na detail.</a></p>
                <a href="mailto:cau@zivotjelajf.com?subject=Booking KAPELA PIVÍČKO" class="btn btn-primary">BOOKUJ!</a>
            </div>
            
            <div class="card band-card">
                <div style="width: 100%; height: 200px; background: linear-gradient(45deg, #2a3441, #1a2332); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: #ff4444; font-size: 3rem;">🎹</div>
                <h3 class="band-name">ČAU</h3>
                <p>Indie pop projekt s melancholickými melodiemi a poetickými texty. Minimalistický přístup k hudbě s maximálním emočním dopadem.</p>
                <p><a href="#" style="color: #ff4444;">Proklik na detail.</a></p>
                <a href="mailto:cau@zivotjelajf.com?subject=Booking ČAU" class="btn btn-primary">BOOKUJ!</a>
            </div>
        </div>
        
        <div class="card text-center mt-4" style="background: linear-gradient(135deg, #ff4444, #ff6666); color: white;">
            <h3>👆 Toto jsou ukázkové kapely</h3>
            <p><strong>Pro administrátora:</strong> Tyto placeholdery zmizí automaticky, jakmile přidáte první skutečnou kapelu v <code>Kapely → Přidat novou</code></p>
        </div>
        
        <?php endif; ?>
        
        <div class="text-center mt-4">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="btn btn-secondary">Zpět na hlavní stránku</a>
        </div>
    </div>
</section>

<?php get_footer(); ?>
