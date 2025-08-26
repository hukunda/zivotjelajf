<?php get_header(); ?>

<section class="section">
    <div class="container">
        <div class="section-header">
            <h1 class="section-title">KONCERTY</h1>
            <p class="section-intro">Tady bude povídání o nejbližších koncertech co jsou v blízké době.</p>
        </div>
        
        <div class="card">
            <table class="events-table">
                <thead>
                    <tr>
                        <th>Datum</th>
                        <th>Jméno kapely</th>
                        <th>Kde ten koncert je</th>
                        <th>Od kolika</th>
                        <th>Cena</th>
                        <th>Lupeny</th>
                        <th>Odkazy</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    // Get all upcoming events
                    $upcoming_events = get_posts(array(
                        'post_type' => 'event',
                        'posts_per_page' => -1,
                        'meta_key' => '_event_date',
                        'orderby' => 'meta_value',
                        'order' => 'ASC',
                        'meta_query' => array(
                            array(
                                'key' => '_event_date',
                                'value' => date('Y-m-d'),
                                'compare' => '>='
                            )
                        )
                    ));
                    
                    foreach ($upcoming_events as $event) :
                        $event_date = get_post_meta($event->ID, '_event_date', true);
                        $event_time = get_post_meta($event->ID, '_event_time', true);
                        $event_venue = get_post_meta($event->ID, '_event_venue', true);
                        $event_price = get_post_meta($event->ID, '_event_price', true);
                        $tickets_url = get_post_meta($event->ID, '_event_tickets_url', true);
                        $band_id = get_post_meta($event->ID, '_event_band', true);
                        $band_name = $band_id ? get_the_title($band_id) : $event->post_title;
                        $website_url = get_post_meta($event->ID, '_event_website', true);
                        $facebook_url = get_post_meta($event->ID, '_event_facebook', true);
                        $instagram_url = get_post_meta($event->ID, '_event_instagram', true);
                    ?>
                    <tr>
                        <td>
                            <span class="event-date"><?php echo esc_html(format_czech_date($event_date)); ?></span>
                        </td>
                        <td>
                            <?php if ($band_id) : ?>
                                <a href="<?php echo esc_url(get_permalink($band_id)); ?>"><?php echo esc_html($band_name); ?></a>
                            <?php else : ?>
                                <?php echo esc_html($band_name); ?>
                            <?php endif; ?>
                        </td>
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
                    
                    <?php if (empty($upcoming_events)) : ?>
                    <!-- Placeholder Content - Remove this section once you add real events -->
                    <tr>
                        <td><span class="event-date">19.4.</span></td>
                        <td><a href="#" style="color: #ff4444;">ACID ROW</a></td>
                        <td>Rock Café, Praha</td>
                        <td>20:00</td>
                        <td><span class="event-price">250 Kč</span></td>
                        <td><a href="mailto:cau@zivotjelajf.com?subject=Lístky ACID ROW 19.4." class="btn btn-primary">Lupeny</a></td>
                        <td>
                            <div class="social-links">
                                <a href="#" target="_blank">W</a>
                                <a href="#" target="_blank">FB</a>
                                <a href="#" target="_blank">IG</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><span class="event-date">20.4.</span></td>
                        <td><a href="#" style="color: #ff4444;">OOBBT</a></td>
                        <td>Cross Club, Praha</td>
                        <td>21:00</td>
                        <td>-</td>
                        <td><a href="mailto:cau@zivotjelajf.com?subject=Lístky OOBBT 20.4." class="btn btn-primary">Lupeny</a></td>
                        <td>
                            <div class="social-links">
                                <a href="#" target="_blank">W</a>
                                <a href="#" target="_blank">FB</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><span class="event-date">21.4.</span></td>
                        <td><a href="#" style="color: #ff4444;">KAPELA PIVÍČKO</a></td>
                        <td>Palác Akropolis, Praha</td>
                        <td>19:30</td>
                        <td><span class="event-price">180 Kč</span></td>
                        <td><a href="mailto:cau@zivotjelajf.com?subject=Lístky KAPELA PIVÍČKO 21.4." class="btn btn-primary">Lupeny</a></td>
                        <td>
                            <div class="social-links">
                                <a href="#" target="_blank">FB</a>
                                <a href="#" target="_blank">IG</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><span class="event-date">22.5.</span></td>
                        <td><a href="#" style="color: #ff4444;">ČAU</a></td>
                        <td>Café V lese, Praha</td>
                        <td>20:00</td>
                        <td><span class="event-price">150 Kč</span></td>
                        <td><a href="mailto:cau@zivotjelajf.com?subject=Lístky ČAU 22.5." class="btn btn-primary">Lupeny</a></td>
                        <td>
                            <div class="social-links">
                                <a href="#" target="_blank">W</a>
                                <a href="#" target="_blank">IG</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><span class="event-date">22.5.</span></td>
                        <td style="color: #ff4444; font-weight: bold;">TORNATANKA</td>
                        <td>Lucerna Music Bar, Praha</td>
                        <td>21:00</td>
                        <td><span class="event-price">5€</span></td>
                        <td><a href="mailto:cau@zivotjelajf.com?subject=Lístky TORNATANKA 22.5." class="btn btn-primary">Lupeny</a></td>
                        <td>
                            <div class="social-links">
                                <a href="#" target="_blank">W</a>
                                <a href="#" target="_blank">FB</a>
                                <a href="#" target="_blank">IG</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="7" style="text-align: center; padding: 20px; background: linear-gradient(135deg, #ff4444, #ff6666); color: white;">
                            <strong>👆 Toto jsou ukázkové koncerty</strong><br>
                            <small>Pro administrátora: Tyto placeholdery zmizí automaticky, jakmile přidáte první skutečný koncert v <code>Koncerty → Přidat nový</code> nebo synchronizujete Google Calendar</small>
                        </td>
                    </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
        
        <!-- Special booking slots section -->
        <div class="section">
            <h2>FREE SLOTS !!! ZAČNI BOOKOVAT!</h2>
            <div class="grid grid-2">
                <div class="card text-center">
                    <h3>Volné termíny pro vaše koncerty</h3>
                    <p>Máte kapelu a hledáte termín pro koncert? Kontaktujte nás a domluvme si detaily!</p>
                    <a href="mailto:<?php echo esc_attr(get_theme_mod('zivot_email', 'cau@zivotjelajf.com')); ?>?subject=Booking - koncert" class="btn btn-primary">BOOKUJ!</a>
                </div>
                
                <div class="card text-center">
                    <h3>Organizujeme vaše akce</h3>
                    <p>Potřebujete zorganizovat hudební akci? Máme zkušenosti a kontakty pro úspěšnou realizaci.</p>
                    <a href="mailto:<?php echo esc_attr(get_theme_mod('zivot_email', 'cau@zivotjelajf.com')); ?>?subject=Organizace akce" class="btn btn-primary">BOOKUJ!</a>
                </div>
            </div>
        </div>
    </div>
</section>

<?php get_footer(); ?>
