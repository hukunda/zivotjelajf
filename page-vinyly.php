<?php get_header(); ?>

<section class="section">
    <div class="container">
        <div class="section-header">
            <h1 class="section-title">O VINYLECH</h1>
            <h2 class="section-title">naše vinyly</h2>
            <p class="section-intro">Tady bude povídání o vinylech</p>
        </div>
        
        <?php
        $vinyls = get_posts(array(
            'post_type' => 'vinyl',
            'posts_per_page' => -1,
            'orderby' => 'date',
            'order' => 'DESC'
        ));
        
        if (!empty($vinyls)) : ?>
        <div class="grid grid-3">
            <?php foreach ($vinyls as $vinyl) :
                setup_postdata($vinyl);
                $band_id = get_post_meta($vinyl->ID, '_vinyl_band', true);
                $band_name = $band_id ? get_the_title($band_id) : '';
                $price = get_post_meta($vinyl->ID, '_vinyl_price', true);
                $buy_url = get_post_meta($vinyl->ID, '_vinyl_buy_url', true);
            ?>
            <div class="card vinyl-card">
                <?php if (has_post_thumbnail($vinyl->ID)) : ?>
                    <img src="<?php echo esc_url(get_the_post_thumbnail_url($vinyl->ID, 'vinyl-card')); ?>" alt="<?php echo esc_attr($vinyl->post_title); ?>">
                <?php endif; ?>
                
                <h3 class="vinyl-title"><?php echo esc_html($vinyl->post_title); ?></h3>
                
                <?php if ($band_name) : ?>
                    <p class="small-text">
                        <?php if ($band_id) : ?>
                            <a href="<?php echo esc_url(get_permalink($band_id)); ?>"><?php echo esc_html($band_name); ?></a>
                        <?php else : ?>
                            <?php echo esc_html($band_name); ?>
                        <?php endif; ?>
                    </p>
                <?php endif; ?>
                
                <p><?php echo wp_trim_words(get_the_excerpt($vinyl->ID), 15); ?></p>
                
                <?php if ($price) : ?>
                    <p class="event-price"><?php echo esc_html($price); ?> Kč</p>
                <?php endif; ?>
                
                <div class="vinyl-actions">
                    <a href="<?php echo esc_url(get_permalink($vinyl->ID)); ?>" class="btn btn-secondary">Proklik na detail</a>
                    <?php zivot_vinyl_buy_button($vinyl->ID); ?>
                </div>
            </div>
            <?php endforeach; wp_reset_postdata(); ?>
        </div>
        
        <?php else : ?>
        
        <!-- Placeholder Content - Remove this section once you add real vinyls -->
        <div class="grid grid-3">
            <div class="card vinyl-card">
                <div style="width: 100%; height: 250px; background: linear-gradient(45deg, #2a3441, #1a2332); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: #ff4444; font-size: 4rem;">💿</div>
                <h3 class="vinyl-title">POISONED MIND / ACID ROW</h3>
                <p class="small-text">ACID ROW</p>
                <p>Povídání o vinylu, jak vznikl nebo já nevím co všechno. Heavy sound s melodickými prvky na 180g vinylu.</p>
                <p class="event-price">450 Kč</p>
                <div class="vinyl-actions">
                    <a href="#" class="btn btn-secondary">Proklik na detail</a>
                    <a href="mailto:cau@zivotjelajf.com?subject=Objednávka - ACID ROW vinyl" class="btn btn-primary">Kup vinyl</a>
                </div>
            </div>
            
            <div class="card vinyl-card">
                <div style="width: 100%; height: 250px; background: linear-gradient(45deg, #2a3441, #1a2332); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: #ff4444; font-size: 4rem;">🎵</div>
                <h3 class="vinyl-title">ELECTRONIC DREAMS</h3>
                <p class="small-text">OOBBT</p>
                <p>Povídání o vinylu, jak vznikl. Experimentální elektronika s organickými prvky na limitované edici.</p>
                <p class="event-price">380 Kč</p>
                <div class="vinyl-actions">
                    <a href="#" class="btn btn-secondary">Proklik na detail</a>
                    <a href="mailto:cau@zivotjelajf.com?subject=Objednávka - OOBBT vinyl" class="btn btn-primary">Kup vinyl</a>
                </div>
            </div>
            
            <div class="card vinyl-card">
                <div style="width: 100%; height: 250px; background: linear-gradient(45deg, #2a3441, #1a2332); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: #ff4444; font-size: 4rem;">🍺</div>
                <h3 class="vinyl-title">PIVNÍ SEZÓNA</h3>
                <p class="small-text">KAPELA PIVÍČKO</p>
                <p>Povídání o vinylu, jak vznikl. Vtipné texty a chytlavé melodie pro dobrou náladu.</p>
                <p class="event-price">320 Kč</p>
                <div class="vinyl-actions">
                    <a href="#" class="btn btn-secondary">Proklik na detail</a>
                    <a href="mailto:cau@zivotjelajf.com?subject=Objednávka - KAPELA PIVÍČKO vinyl" class="btn btn-primary">Kup vinyl</a>
                </div>
            </div>
            
            <div class="card vinyl-card">
                <div style="width: 100%; height: 250px; background: linear-gradient(45deg, #2a3441, #1a2332); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: #ff4444; font-size: 4rem;">🌙</div>
                <h3 class="vinyl-title">MELANCHOLIE</h3>
                <p class="small-text">ČAU</p>
                <p>Povídání o vinylu, jak vznikl. Indie pop s poetickými texty a atmosférickými aranžemi.</p>
                <p class="event-price">350 Kč</p>
                <div class="vinyl-actions">
                    <a href="#" class="btn btn-secondary">Proklik na detail</a>
                    <a href="mailto:cau@zivotjelajf.com?subject=Objednávka - ČAU vinyl" class="btn btn-primary">Kup vinyl</a>
                </div>
            </div>
            
            <div class="card vinyl-card">
                <div style="width: 100%; height: 250px; background: linear-gradient(45deg, #2a3441, #1a2332); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: #ff4444; font-size: 4rem;">🎸</div>
                <h3 class="vinyl-title">GET LAJF</h3>
                <p class="small-text">ACID ROW</p>
                <p>10 tracks včetně hitů "Get LAJF" a "Stoner's Paradise". Originální grafika a limitovaná edice.</p>
                <p class="event-price">420 Kč</p>
                <div class="vinyl-actions">
                    <a href="#" class="btn btn-secondary">Proklik na detail</a>
                    <a href="mailto:cau@zivotjelajf.com?subject=Objednávka - ACID ROW GET LAJF vinyl" class="btn btn-primary">Kup vinyl</a>
                </div>
            </div>
            
            <div class="card vinyl-card">
                <div style="width: 100%; height: 250px; background: linear-gradient(45deg, #2a3441, #1a2332); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: #ff4444; font-size: 4rem;">🔥</div>
                <h3 class="vinyl-title">UNDERGROUND HITS</h3>
                <p class="small-text">Various Artists</p>
                <p>Kompilace nejlepších skladeb od všech našich kapel. Ideální úvod do světa Život je lajf.</p>
                <p class="event-price">280 Kč</p>
                <div class="vinyl-actions">
                    <a href="#" class="btn btn-secondary">Proklik na detail</a>
                    <a href="mailto:cau@zivotjelajf.com?subject=Objednávka - Underground Hits vinyl" class="btn btn-primary">Kup vinyl</a>
                </div>
            </div>
        </div>
        
        <div class="card text-center mt-4" style="background: linear-gradient(135deg, #ff4444, #ff6666); color: white;">
            <h3>👆 Toto jsou ukázkové vinyly</h3>
            <p><strong>Pro administrátora:</strong> Tyto placeholdery zmizí automaticky, jakmile přidáte první skutečný vinyl v <code>Vinyly → Přidat nový</code></p>
        </div>
        
        <?php endif; ?>
        
        <div class="section text-center">
            <h2>Chcete si nechat vyrobit vinyl?</h2>
            <p>Pomůžeme vám s produkcí vašeho vlastního vinylu od A do Z.</p>
            <a href="mailto:<?php echo esc_attr(get_theme_mod('zivot_email', 'cau@zivotjelajf.com')); ?>?subject=Chci udělat vinyl" class="btn btn-primary">Chceš udělat vinyl?</a>
        </div>
    </div>
</section>

<?php get_footer(); ?>
