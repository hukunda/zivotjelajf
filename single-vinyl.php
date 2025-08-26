<?php get_header(); ?>

<?php while (have_posts()) : the_post(); ?>

<section class="section">
    <div class="container">
        <div class="grid grid-2">
            <div class="vinyl-image">
                <?php if (has_post_thumbnail()) : ?>
                    <img src="<?php echo esc_url(get_the_post_thumbnail_url(get_the_ID(), 'large')); ?>" alt="<?php echo esc_attr(get_the_title()); ?>" style="width: 100%; max-width: 400px; border-radius: 8px;">
                <?php endif; ?>
            </div>
            
            <div class="vinyl-details">
                <h1><?php the_title(); ?></h1>
                
                <?php
                $band_id = get_post_meta(get_the_ID(), '_vinyl_band', true);
                $band_name = $band_id ? get_the_title($band_id) : '';
                $price = get_post_meta(get_the_ID(), '_vinyl_price', true);
                $bandcamp_url = get_post_meta(get_the_ID(), '_vinyl_bandcamp', true);
                $apple_music_url = get_post_meta(get_the_ID(), '_vinyl_apple_music', true);
                $band_url = get_post_meta(get_the_ID(), '_vinyl_band_url', true);
                $buy_url = get_post_meta(get_the_ID(), '_vinyl_buy_url', true);
                ?>
                
                <?php if ($band_name) : ?>
                    <p class="vinyl-band">
                        <?php if ($band_id) : ?>
                            <a href="<?php echo esc_url(get_permalink($band_id)); ?>"><?php echo esc_html($band_name); ?></a>
                        <?php else : ?>
                            <?php echo esc_html($band_name); ?>
                        <?php endif; ?>
                    </p>
                <?php endif; ?>
                
                <?php if ($price) : ?>
                    <p class="vinyl-price event-price"><?php echo esc_html($price); ?> Kč</p>
                <?php endif; ?>
                
                <div class="content">
                    <?php the_content(); ?>
                </div>
                
                <div class="vinyl-actions mt-4">
                    <?php zivot_vinyl_buy_button(); ?>
                    
                    <?php if ($bandcamp_url) : ?>
                        <a href="<?php echo esc_url($bandcamp_url); ?>" class="btn btn-secondary" target="_blank" rel="noopener">BandCamp</a>
                    <?php endif; ?>
                    
                    <?php if ($apple_music_url) : ?>
                        <a href="<?php echo esc_url($apple_music_url); ?>" class="btn btn-secondary" target="_blank" rel="noopener">Apple Music</a>
                    <?php endif; ?>
                    
                    <?php if ($band_url || $band_id) : ?>
                        <a href="<?php echo esc_url($band_url ? $band_url : get_permalink($band_id)); ?>" class="btn btn-secondary" <?php echo $band_url ? 'target="_blank" rel="noopener"' : ''; ?>>Mrkni na <?php echo esc_html($band_name ? $band_name : 'kapelu'); ?></a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        
        <!-- Nejbližší koncert od této kapely -->
        <?php if ($band_id) :
            $next_concert = get_posts(array(
                'post_type' => 'event',
                'posts_per_page' => 1,
                'meta_key' => '_event_date',
                'orderby' => 'meta_value',
                'order' => 'ASC',
                'meta_query' => array(
                    array(
                        'key' => '_event_band',
                        'value' => $band_id,
                        'compare' => '='
                    ),
                    array(
                        'key' => '_event_date',
                        'value' => date('Y-m-d'),
                        'compare' => '>='
                    )
                )
            ));
            
            if (!empty($next_concert)) :
                $event = $next_concert[0];
                $event_date = get_post_meta($event->ID, '_event_date', true);
                $event_time = get_post_meta($event->ID, '_event_time', true);
                $event_venue = get_post_meta($event->ID, '_event_venue', true);
                $event_price = get_post_meta($event->ID, '_event_price', true);
                $tickets_url = get_post_meta($event->ID, '_event_tickets_url', true);
        ?>
        <div class="section">
            <h2>nejbližší koncert <?php echo esc_html($band_name); ?></h2>
            
            <div class="card">
                <div class="event-card">
                    <div class="event-date"><?php echo esc_html(format_czech_date($event_date)); ?></div>
                    <h3 class="event-title"><?php echo esc_html($event->post_title); ?></h3>
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
                        
                        <?php if ($tickets_url) : ?>
                            <a href="<?php echo esc_url($tickets_url); ?>" target="_blank" rel="noopener" class="btn btn-primary">Lupeny</a>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
        <?php endif; endif; ?>
        
        <!-- Related Vinyls -->
        <?php
        $related_vinyls = get_posts(array(
            'post_type' => 'vinyl',
            'posts_per_page' => 3,
            'post__not_in' => array(get_the_ID()),
            'meta_query' => array(
                array(
                    'key' => '_vinyl_band',
                    'value' => $band_id,
                    'compare' => '='
                )
            )
        ));
        
        if (!empty($related_vinyls)) :
        ?>
        <div class="section">
            <h2>Další vinyly od <?php echo esc_html($band_name); ?></h2>
            
            <div class="grid grid-3">
                <?php foreach ($related_vinyls as $vinyl) :
                    $vinyl_price = get_post_meta($vinyl->ID, '_vinyl_price', true);
                    $vinyl_buy_url = get_post_meta($vinyl->ID, '_vinyl_buy_url', true);
                ?>
                <div class="card vinyl-card">
                    <?php if (has_post_thumbnail($vinyl->ID)) : ?>
                        <img src="<?php echo esc_url(get_the_post_thumbnail_url($vinyl->ID, 'vinyl-card')); ?>" alt="<?php echo esc_attr($vinyl->post_title); ?>">
                    <?php endif; ?>
                    
                    <h3 class="vinyl-title"><?php echo esc_html($vinyl->post_title); ?></h3>
                    
                    <?php if ($vinyl_price) : ?>
                        <p class="event-price"><?php echo esc_html($vinyl_price); ?> Kč</p>
                    <?php endif; ?>
                    
                    <p><?php echo wp_trim_words(get_the_excerpt($vinyl->ID), 15); ?></p>
                    
                    <div class="vinyl-actions">
                        <a href="<?php echo esc_url(get_permalink($vinyl->ID)); ?>" class="btn btn-secondary">Detail</a>
                        <?php zivot_vinyl_buy_button($vinyl->ID); ?>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php endif; ?>
        
        <div class="text-center mt-4">
            <a href="<?php echo esc_url(home_url('/vinyly')); ?>" class="btn btn-secondary">Zpět na všechny vinyly</a>
        </div>
    </div>
</section>

<?php endwhile; ?>

<?php get_footer(); ?>
