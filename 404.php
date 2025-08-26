<?php get_header(); ?>

<section class="section">
    <div class="container">
        <div class="card text-center">
            <h1>404 - Stránka nenalezena</h1>
            <p>Omlouváme se, ale stránka, kterou hledáte, neexistuje.</p>
            <p>Možná se stránka přesunula nebo byl změněn její název.</p>
            
            <div class="error-actions mt-4">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="btn btn-primary">Zpět na hlavní stránku</a>
                <a href="<?php echo esc_url(home_url('/koncerty')); ?>" class="btn btn-secondary">Koncerty</a>
                <a href="<?php echo esc_url(home_url('/kapely')); ?>" class="btn btn-secondary">Kapely</a>
                <a href="<?php echo esc_url(home_url('/vinyly')); ?>" class="btn btn-secondary">Vinyly</a>
            </div>
            
            <div class="mt-4">
                <h3>Nebo zkuste vyhledat:</h3>
                <?php get_search_form(); ?>
            </div>
        </div>
        
        <!-- Suggested content -->
        <div class="section">
            <h2>Nejnovější koncerty</h2>
            <div class="grid grid-3">
                <?php
                $upcoming_events = get_upcoming_events(3);
                foreach ($upcoming_events as $event) :
                    $event_date = get_post_meta($event->ID, '_event_date', true);
                    $event_venue = get_post_meta($event->ID, '_event_venue', true);
                    $band_id = get_post_meta($event->ID, '_event_band', true);
                    $band_name = $band_id ? get_the_title($band_id) : $event->post_title;
                ?>
                <div class="event-card">
                    <div class="event-date"><?php echo esc_html(format_czech_date($event_date)); ?></div>
                    <h4 class="event-title"><?php echo esc_html($band_name); ?></h4>
                    <p class="event-venue"><?php echo esc_html($event_venue); ?></p>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>

<?php get_footer(); ?>
