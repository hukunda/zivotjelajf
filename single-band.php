<?php get_header(); ?>

<?php while (have_posts()) : the_post(); ?>

<section class="section">
    <div class="container">
        <div class="card">
            <?php if (has_post_thumbnail()) : ?>
                <div class="band-hero-image mb-4">
                    <img src="<?php echo esc_url(get_the_post_thumbnail_url(get_the_ID(), 'large')); ?>" alt="<?php echo esc_attr(get_the_title()); ?>" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px;">
                </div>
            <?php endif; ?>
            
            <h1><?php the_title(); ?></h1>
            
            <?php
            $short_description = get_post_meta(get_the_ID(), '_band_short_description', true);
            $booking_url = get_post_meta(get_the_ID(), '_band_booking_url', true);
            $website_url = get_post_meta(get_the_ID(), '_band_website', true);
            $facebook_url = get_post_meta(get_the_ID(), '_band_facebook', true);
            $instagram_url = get_post_meta(get_the_ID(), '_band_instagram', true);
            ?>
            
            <?php if ($short_description) : ?>
                <p class="lead"><?php echo esc_html($short_description); ?></p>
            <?php endif; ?>
            
            <div class="content">
                <?php the_content(); ?>
            </div>
            
            <div class="band-actions mt-4">
                <?php if ($booking_url) : ?>
                    <a href="<?php echo esc_url($booking_url); ?>" class="btn btn-primary" target="_blank" rel="noopener">BOOKUJ!</a>
                <?php endif; ?>
                
                <div class="social-links mt-2">
                    <?php if ($website_url) : ?>
                        <a href="<?php echo esc_url($website_url); ?>" target="_blank" rel="noopener">Web</a>
                    <?php endif; ?>
                    <?php if ($facebook_url) : ?>
                        <a href="<?php echo esc_url($facebook_url); ?>" target="_blank" rel="noopener">Facebook</a>
                    <?php endif; ?>
                    <?php if ($instagram_url) : ?>
                        <a href="<?php echo esc_url($instagram_url); ?>" target="_blank" rel="noopener">Instagram</a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        
        <!-- Band Events -->
        <?php
        $band_events = get_band_events(get_the_ID(), 10);
        if (!empty($band_events)) :
        ?>
        <div class="section">
            <h2>Koncerty</h2>
            
            <div class="card">
                <table class="events-table">
                    <thead>
                        <tr>
                            <th>Datum</th>
                            <th>NÁZEV AKCE</th>
                            <th>Kde ten koncert je</th>
                            <th>Od kolika</th>
                            <th>Cena</th>
                            <th>Lupeny</th>
                            <th>Odkazy</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($band_events as $event) :
                            $event_date = get_post_meta($event->ID, '_event_date', true);
                            $event_time = get_post_meta($event->ID, '_event_time', true);
                            $event_venue = get_post_meta($event->ID, '_event_venue', true);
                            $event_price = get_post_meta($event->ID, '_event_price', true);
                            $tickets_url = get_post_meta($event->ID, '_event_tickets_url', true);
                            $website_url = get_post_meta($event->ID, '_event_website', true);
                            $facebook_url = get_post_meta($event->ID, '_event_facebook', true);
                            $instagram_url = get_post_meta($event->ID, '_event_instagram', true);
                        ?>
                        <tr>
                            <td>
                                <span class="event-date"><?php echo esc_html(format_czech_date($event_date)); ?></span>
                            </td>
                            <td><?php echo esc_html($event->post_title); ?></td>
                            <td><?php echo esc_html($event_venue); ?></td>
                            <td><?php echo esc_html($event_time); ?></td>
                            <td>
                                <?php if ($event_price) : ?>
                                    <span class="event-price"><?php echo esc_html($event_price); ?></span>
                                <?php else : ?>
                                    -
                                <?php endif; ?>
                            </td>
                            <td>
                                <?php if ($tickets_url) : ?>
                                    <a href="<?php echo esc_url($tickets_url); ?>" target="_blank" rel="noopener" class="btn btn-primary">Lupeny</a>
                                <?php else : ?>
                                    -
                                <?php endif; ?>
                            </td>
                            <td>
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
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
        <?php endif; ?>
        
        <!-- Free Slots for Booking -->
        <div class="section">
            <div class="card text-center">
                <h2>FREE SLOTS !!! ZAČNI BOOKOVAT!</h2>
                <p>Chcete si zabuknout koncert s <?php the_title(); ?>? Kontaktujte nás!</p>
                <?php if ($booking_url) : ?>
                    <a href="<?php echo esc_url($booking_url); ?>" class="btn btn-primary" target="_blank" rel="noopener">BOOKUJ!</a>
                <?php else : ?>
                    <a href="mailto:<?php echo esc_attr(get_theme_mod('zivot_email', 'cau@zivotjelajf.com')); ?>?subject=Booking - <?php echo esc_attr(get_the_title()); ?>" class="btn btn-primary">BOOKUJ!</a>
                <?php endif; ?>
            </div>
        </div>
        
        <!-- Related Vinyls -->
        <?php
        $related_vinyls = get_posts(array(
            'post_type' => 'vinyl',
            'posts_per_page' => 3,
            'meta_query' => array(
                array(
                    'key' => '_vinyl_band',
                    'value' => get_the_ID(),
                    'compare' => '='
                )
            )
        ));
        
        if (!empty($related_vinyls)) :
        ?>
        <div class="section">
            <h2>Vinyly od <?php the_title(); ?></h2>
            
            <div class="grid grid-3">
                <?php foreach ($related_vinyls as $vinyl) :
                    $price = get_post_meta($vinyl->ID, '_vinyl_price', true);
                    $buy_url = get_post_meta($vinyl->ID, '_vinyl_buy_url', true);
                ?>
                <div class="card vinyl-card">
                    <?php if (has_post_thumbnail($vinyl->ID)) : ?>
                        <img src="<?php echo esc_url(get_the_post_thumbnail_url($vinyl->ID, 'vinyl-card')); ?>" alt="<?php echo esc_attr($vinyl->post_title); ?>">
                    <?php endif; ?>
                    
                    <h3 class="vinyl-title"><?php echo esc_html($vinyl->post_title); ?></h3>
                    
                    <?php if ($price) : ?>
                        <p class="event-price"><?php echo esc_html($price); ?> Kč</p>
                    <?php endif; ?>
                    
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
            <a href="<?php echo esc_url(home_url('/kapely')); ?>" class="btn btn-secondary">Zpět na všechny kapely</a>
        </div>
    </div>
</section>

<?php endwhile; ?>

<?php get_footer(); ?>
