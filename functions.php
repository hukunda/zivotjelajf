<?php
/**
 * Život je lajf Theme Functions
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Theme Setup
 */
function zivot_theme_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    add_theme_support('custom-logo');
    
    // Register menus
    register_nav_menus(array(
        'header-menu' => 'Hlavní navigace',
        'footer-menu' => 'Navigace v patičce'
    ));
    
    // Add image sizes
    add_image_size('band-card', 300, 200, true);
    add_image_size('vinyl-card', 300, 300, true);
    add_image_size('event-thumb', 150, 100, true);
}
add_action('after_setup_theme', 'zivot_theme_setup');

/**
 * Enqueue Scripts and Styles
 */
function zivot_theme_scripts() {
    wp_enqueue_style('zivot-style', get_stylesheet_uri(), array(), '1.0.0');
    wp_enqueue_script('zivot-script', get_template_directory_uri() . '/js/main.js', array('jquery'), '1.0.0', true);
    
    // Localize script for AJAX
    wp_localize_script('zivot-script', 'zivot_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('zivot_nonce')
    ));
}
add_action('wp_enqueue_scripts', 'zivot_theme_scripts');

/**
 * Custom Post Types
 */

// Events (Koncerty)
function register_events_post_type() {
    $labels = array(
        'name' => 'Koncerty',
        'singular_name' => 'Koncert',
        'menu_name' => 'Koncerty',
        'add_new' => 'Přidat koncert',
        'add_new_item' => 'Přidat nový koncert',
        'edit_item' => 'Upravit koncert',
        'new_item' => 'Nový koncert',
        'view_item' => 'Zobrazit koncert',
        'search_items' => 'Hledat koncerty',
        'not_found' => 'Žádné koncerty nenalezeny',
        'not_found_in_trash' => 'Žádné koncerty v koši'
    );
    
    $args = array(
        'labels' => $labels,
        'public' => true,
        'has_archive' => true,
        'rewrite' => array('slug' => 'koncert'),
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-calendar-alt',
        'show_in_rest' => true
    );
    
    register_post_type('event', $args);
}
add_action('init', 'register_events_post_type');

// Bands (Kapely)
function register_bands_post_type() {
    $labels = array(
        'name' => 'Kapely',
        'singular_name' => 'Kapela',
        'menu_name' => 'Kapely',
        'add_new' => 'Přidat kapelu',
        'add_new_item' => 'Přidat novou kapelu',
        'edit_item' => 'Upravit kapelu',
        'new_item' => 'Nová kapela',
        'view_item' => 'Zobrazit kapelu',
        'search_items' => 'Hledat kapely',
        'not_found' => 'Žádné kapely nenalezeny',
        'not_found_in_trash' => 'Žádné kapely v koši'
    );
    
    $args = array(
        'labels' => $labels,
        'public' => true,
        'has_archive' => true,
        'rewrite' => array('slug' => 'kapela'),
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-groups',
        'show_in_rest' => true
    );
    
    register_post_type('band', $args);
}
add_action('init', 'register_bands_post_type');

// Vinyls
function register_vinyls_post_type() {
    $labels = array(
        'name' => 'Vinyly',
        'singular_name' => 'Vinyl',
        'menu_name' => 'Vinyly',
        'add_new' => 'Přidat vinyl',
        'add_new_item' => 'Přidat nový vinyl',
        'edit_item' => 'Upravit vinyl',
        'new_item' => 'Nový vinyl',
        'view_item' => 'Zobrazit vinyl',
        'search_items' => 'Hledat vinyly',
        'not_found' => 'Žádné vinyly nenalezeny',
        'not_found_in_trash' => 'Žádné vinyly v koši'
    );
    
    $args = array(
        'labels' => $labels,
        'public' => true,
        'has_archive' => true,
        'rewrite' => array('slug' => 'vinyl'),
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-album',
        'show_in_rest' => true
    );
    
    register_post_type('vinyl', $args);
}
add_action('init', 'register_vinyls_post_type');

/**
 * Add Custom Fields (Meta Boxes)
 */

// Event Meta Box
function add_event_meta_box() {
    add_meta_box(
        'event-details',
        'Detaily koncertu',
        'event_meta_box_callback',
        'event',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'add_event_meta_box');

function event_meta_box_callback($post) {
    wp_nonce_field('event_meta_nonce', 'event_meta_nonce_field');
    
    $date = get_post_meta($post->ID, '_event_date', true);
    $time = get_post_meta($post->ID, '_event_time', true);
    $venue = get_post_meta($post->ID, '_event_venue', true);
    $price = get_post_meta($post->ID, '_event_price', true);
    $tickets_url = get_post_meta($post->ID, '_event_tickets_url', true);
    $band_id = get_post_meta($post->ID, '_event_band', true);
    $website_url = get_post_meta($post->ID, '_event_website', true);
    $facebook_url = get_post_meta($post->ID, '_event_facebook', true);
    $instagram_url = get_post_meta($post->ID, '_event_instagram', true);
    
    ?>
    <table class="form-table">
        <tr>
            <th><label for="event_date">Datum</label></th>
            <td><input type="date" id="event_date" name="event_date" value="<?php echo esc_attr($date); ?>" /></td>
        </tr>
        <tr>
            <th><label for="event_time">Od kolika</label></th>
            <td><input type="time" id="event_time" name="event_time" value="<?php echo esc_attr($time); ?>" /></td>
        </tr>
        <tr>
            <th><label for="event_venue">Kde ten koncert je</label></th>
            <td><input type="text" id="event_venue" name="event_venue" value="<?php echo esc_attr($venue); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th><label for="event_price">Cena (volitelné, např. "5€")</label></th>
            <td><input type="text" id="event_price" name="event_price" value="<?php echo esc_attr($price); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th><label for="event_band">Kapela</label></th>
            <td>
                <select id="event_band" name="event_band">
                    <option value="">Vyberte kapelu</option>
                    <?php
                    $bands = get_posts(array('post_type' => 'band', 'posts_per_page' => -1));
                    foreach ($bands as $band) {
                        $selected = ($band_id == $band->ID) ? 'selected' : '';
                        echo '<option value="' . $band->ID . '" ' . $selected . '>' . $band->post_title . '</option>';
                    }
                    ?>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="event_tickets_url">Lupeny (URL)</label></th>
            <td><input type="url" id="event_tickets_url" name="event_tickets_url" value="<?php echo esc_attr($tickets_url); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th><label for="event_website">Web (URL)</label></th>
            <td><input type="url" id="event_website" name="event_website" value="<?php echo esc_attr($website_url); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th><label for="event_facebook">Facebook (URL)</label></th>
            <td><input type="url" id="event_facebook" name="event_facebook" value="<?php echo esc_attr($facebook_url); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th><label for="event_instagram">Instagram (URL)</label></th>
            <td><input type="url" id="event_instagram" name="event_instagram" value="<?php echo esc_attr($instagram_url); ?>" class="regular-text" /></td>
        </tr>
    </table>
    <?php
}

// Save Event Meta
function save_event_meta($post_id) {
    if (!isset($_POST['event_meta_nonce_field']) || !wp_verify_nonce($_POST['event_meta_nonce_field'], 'event_meta_nonce')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    
    $fields = array('event_date', 'event_time', 'event_venue', 'event_price', 'event_tickets_url', 'event_band', 'event_website', 'event_facebook', 'event_instagram');
    
    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, '_' . $field, sanitize_text_field($_POST[$field]));
        }
    }
}
add_action('save_post', 'save_event_meta');

// Band Meta Box
function add_band_meta_box() {
    add_meta_box(
        'band-details',
        'Detaily kapely',
        'band_meta_box_callback',
        'band',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'add_band_meta_box');

function band_meta_box_callback($post) {
    wp_nonce_field('band_meta_nonce', 'band_meta_nonce_field');
    
    $short_description = get_post_meta($post->ID, '_band_short_description', true);
    $booking_url = get_post_meta($post->ID, '_band_booking_url', true);
    $website_url = get_post_meta($post->ID, '_band_website', true);
    $facebook_url = get_post_meta($post->ID, '_band_facebook', true);
    $instagram_url = get_post_meta($post->ID, '_band_instagram', true);
    
    ?>
    <table class="form-table">
        <tr>
            <th><label for="band_short_description">Krátký popis</label></th>
            <td><textarea id="band_short_description" name="band_short_description" rows="3" class="large-text"><?php echo esc_textarea($short_description); ?></textarea></td>
        </tr>
        <tr>
            <th><label for="band_booking_url">Booking URL (BOOKUJ!)</label></th>
            <td><input type="url" id="band_booking_url" name="band_booking_url" value="<?php echo esc_attr($booking_url); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th><label for="band_website">Web (URL)</label></th>
            <td><input type="url" id="band_website" name="band_website" value="<?php echo esc_attr($website_url); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th><label for="band_facebook">Facebook (URL)</label></th>
            <td><input type="url" id="band_facebook" name="band_facebook" value="<?php echo esc_attr($facebook_url); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th><label for="band_instagram">Instagram (URL)</label></th>
            <td><input type="url" id="band_instagram" name="band_instagram" value="<?php echo esc_attr($instagram_url); ?>" class="regular-text" /></td>
        </tr>
    </table>
    <?php
}

// Save Band Meta
function save_band_meta($post_id) {
    if (!isset($_POST['band_meta_nonce_field']) || !wp_verify_nonce($_POST['band_meta_nonce_field'], 'band_meta_nonce')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    
    $fields = array('band_short_description', 'band_booking_url', 'band_website', 'band_facebook', 'band_instagram');
    
    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, '_' . $field, sanitize_text_field($_POST[$field]));
        }
    }
}
add_action('save_post', 'save_band_meta');

// Vinyl Meta Box
function add_vinyl_meta_box() {
    add_meta_box(
        'vinyl-details',
        'Detaily vinylu',
        'vinyl_meta_box_callback',
        'vinyl',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'add_vinyl_meta_box');

function vinyl_meta_box_callback($post) {
    wp_nonce_field('vinyl_meta_nonce', 'vinyl_meta_nonce_field');
    
    $band_id = get_post_meta($post->ID, '_vinyl_band', true);
    $price = get_post_meta($post->ID, '_vinyl_price', true);
    $bandcamp_url = get_post_meta($post->ID, '_vinyl_bandcamp', true);
    $apple_music_url = get_post_meta($post->ID, '_vinyl_apple_music', true);
    $band_url = get_post_meta($post->ID, '_vinyl_band_url', true);
    $buy_url = get_post_meta($post->ID, '_vinyl_buy_url', true);
    
    ?>
    <table class="form-table">
        <tr>
            <th><label for="vinyl_band">Kapela</label></th>
            <td>
                <select id="vinyl_band" name="vinyl_band">
                    <option value="">Vyberte kapelu</option>
                    <?php
                    $bands = get_posts(array('post_type' => 'band', 'posts_per_page' => -1));
                    foreach ($bands as $band) {
                        $selected = ($band_id == $band->ID) ? 'selected' : '';
                        echo '<option value="' . $band->ID . '" ' . $selected . '>' . $band->post_title . '</option>';
                    }
                    ?>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="vinyl_price">Cena (Kč)</label></th>
            <td><input type="number" id="vinyl_price" name="vinyl_price" value="<?php echo esc_attr($price); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th><label for="vinyl_bandcamp">BandCamp (URL)</label></th>
            <td><input type="url" id="vinyl_bandcamp" name="vinyl_bandcamp" value="<?php echo esc_attr($bandcamp_url); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th><label for="vinyl_apple_music">Apple Music (URL)</label></th>
            <td><input type="url" id="vinyl_apple_music" name="vinyl_apple_music" value="<?php echo esc_attr($apple_music_url); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th><label for="vinyl_band_url">Mrkni na kapelu (URL)</label></th>
            <td><input type="url" id="vinyl_band_url" name="vinyl_band_url" value="<?php echo esc_attr($band_url); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th><label for="vinyl_buy_url">Kup vinyl (URL)</label></th>
            <td><input type="url" id="vinyl_buy_url" name="vinyl_buy_url" value="<?php echo esc_attr($buy_url); ?>" class="regular-text" /></td>
        </tr>
    </table>
    <?php
}

// Save Vinyl Meta
function save_vinyl_meta($post_id) {
    if (!isset($_POST['vinyl_meta_nonce_field']) || !wp_verify_nonce($_POST['vinyl_meta_nonce_field'], 'vinyl_meta_nonce')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    
    $fields = array('vinyl_band', 'vinyl_price', 'vinyl_bandcamp', 'vinyl_apple_music', 'vinyl_band_url', 'vinyl_buy_url');
    
    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, '_' . $field, sanitize_text_field($_POST[$field]));
        }
    }
}
add_action('save_post', 'save_vinyl_meta');

/**
 * Music Player Settings
 */
function zivot_music_player_admin_init() {
    register_setting('zivot_music_player', 'zivot_player_enabled');
    register_setting('zivot_music_player', 'zivot_player_type');
    register_setting('zivot_music_player', 'zivot_player_url');
    register_setting('zivot_music_player', 'zivot_player_track_title');
    register_setting('zivot_music_player', 'zivot_player_track_artist');
    register_setting('zivot_music_player', 'zivot_player_artwork_url');
    register_setting('zivot_music_player', 'zivot_player_autoplay');
}
add_action('admin_init', 'zivot_music_player_admin_init');

function zivot_music_player_admin_menu() {
    add_theme_page(
        'Music Player Settings',
        'Music Player',
        'manage_options',
        'zivot-music-player',
        'zivot_music_player_admin_page'
    );
}
add_action('admin_menu', 'zivot_music_player_admin_menu');

function zivot_music_player_admin_page() {
    $player_enabled = get_option('zivot_player_enabled', '0');
    $player_type = get_option('zivot_player_type', 'bandcamp');
    $player_url = get_option('zivot_player_url', '');
    $track_title = get_option('zivot_player_track_title', '');
    $track_artist = get_option('zivot_player_track_artist', '');
    $artwork_url = get_option('zivot_player_artwork_url', '');
    $autoplay = get_option('zivot_player_autoplay', '0');
    
    ?>
    <div class="wrap">
        <h1>Music Player Settings</h1>
        <p>Nakonfigurujte sticky music player, který se zobrazí v dolní části webu. Podporuje Bandcamp, SoundCloud, Spotify a další služby.</p>
        
        <?php settings_errors(); ?>
        
        <form method="post" action="options.php">
            <?php settings_fields('zivot_music_player'); ?>
            
            <div class="music-player-admin">
                <table class="form-table">
                    <tr>
                        <th scope="row">Aktivovat přehrávač</th>
                        <td>
                            <input type="checkbox" name="zivot_player_enabled" value="1" <?php checked($player_enabled, '1'); ?> />
                            <label>Zobrazit music player na webu</label>
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row">Typ služby</th>
                        <td>
                            <select name="zivot_player_type">
                                <option value="bandcamp" <?php selected($player_type, 'bandcamp'); ?>>Bandcamp</option>
                                <option value="soundcloud" <?php selected($player_type, 'soundcloud'); ?>>SoundCloud</option>
                                <option value="spotify" <?php selected($player_type, 'spotify'); ?>>Spotify</option>
                                <option value="youtube" <?php selected($player_type, 'youtube'); ?>>YouTube</option>
                                <option value="custom" <?php selected($player_type, 'custom'); ?>>Custom HTML/Embed</option>
                            </select>
                            <p class="description">Vyberte službu, odkud chcete přehrávat hudbu</p>
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row">URL / Embed kód</th>
                        <td>
                            <textarea name="zivot_player_url" rows="4" style="width: 100%; max-width: 600px;"><?php echo esc_textarea($player_url); ?></textarea>
                            <p class="description">
                                <strong>Bandcamp:</strong> Zkopírujte embed kód z Bandcamp (celý &lt;iframe&gt; tag)<br>
                                <strong>SoundCloud:</strong> Zkopírujte embed kód z SoundCloud<br>
                                <strong>Spotify:</strong> Zkopírujte Spotify embed kód<br>
                                <strong>YouTube:</strong> Vložte YouTube URL nebo embed kód<br>
                                <strong>Custom:</strong> Jakýkoli HTML/embed kód
                            </p>
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row">Název skladby</th>
                        <td>
                            <input type="text" name="zivot_player_track_title" value="<?php echo esc_attr($track_title); ?>" class="regular-text" />
                            <p class="description">Název skladby/alba, který se zobrazí v přehrávači</p>
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row">Umělec/Kapela</th>
                        <td>
                            <input type="text" name="zivot_player_track_artist" value="<?php echo esc_attr($track_artist); ?>" class="regular-text" />
                            <p class="description">Jméno umělce nebo kapely</p>
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row">Obrázek alba (URL)</th>
                        <td>
                            <input type="url" name="zivot_player_artwork_url" value="<?php echo esc_attr($artwork_url); ?>" class="regular-text" />
                            <p class="description">URL obrázku alba/singlu (volitelné)</p>
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row">Automatické přehrávání</th>
                        <td>
                            <input type="checkbox" name="zivot_player_autoplay" value="1" <?php checked($autoplay, '1'); ?> />
                            <label>Automaticky spustit přehrávání (některé prohlížeče to blokují)</label>
                        </td>
                    </tr>
                </table>
                
                <?php if ($player_url) : ?>
                <div class="embed-preview">
                    <h4>Náhled přehrávače:</h4>
                    <div class="music-player-embed">
                        <?php echo zivot_process_music_embed($player_url, $player_type); ?>
                    </div>
                </div>
                <?php endif; ?>
            </div>
            
            <?php submit_button(); ?>
        </form>
        
        <div class="music-player-admin">
            <h3>Návod k použití</h3>
            
            <h4>🎵 Bandcamp</h4>
            <ol>
                <li>Jděte na váš Bandcamp album/track</li>
                <li>Klikněte na "Share / Embed"</li>
                <li>Zkopírujte celý embed kód a vložte ho do pole "URL / Embed kód"</li>
                <li>Nastavte typ na "Bandcamp"</li>
            </ol>
            
            <h4>🎵 SoundCloud</h4>
            <ol>
                <li>Jděte na váš SoundCloud track/playlist</li>
                <li>Klikněte na "Share" → "Embed"</li>
                <li>Zkopírujte embed kód a vložte ho do pole</li>
                <li>Nastavte typ na "SoundCloud"</li>
            </ol>
            
            <h4>🎵 Spotify</h4>
            <ol>
                <li>Jděte na Spotify Web Player</li>
                <li>Najděte váš album/playlist</li>
                <li>Klikněte na "..." → "Share" → "Embed playlist/album"</li>
                <li>Zkopírujte embed kód</li>
            </ol>
            
            <h4>🎵 YouTube</h4>
            <ol>
                <li>Jděte na YouTube video</li>
                <li>Klikněte na "Share" → "Embed"</li>
                <li>Zkopírujte embed kód nebo jen URL videa</li>
            </ol>
        </div>
    </div>
    <?php
}

function zivot_process_music_embed($url, $type) {
    if (empty($url)) {
        return '';
    }
    
    // If it's already an iframe embed, return it
    if (strpos($url, '<iframe') !== false) {
        return wp_kses($url, array(
            'iframe' => array(
                'src' => array(),
                'width' => array(),
                'height' => array(),
                'frameborder' => array(),
                'allowtransparency' => array(),
                'allow' => array(),
                'style' => array(),
                'title' => array(),
                'loading' => array()
            )
        ));
    }
    
    // Process different URL types
    switch ($type) {
        case 'youtube':
            if (preg_match('/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/', $url, $matches)) {
                $video_id = $matches[1];
                return '<iframe width="100%" height="120" src="https://www.youtube.com/embed/' . esc_attr($video_id) . '?autoplay=0&controls=1" frameborder="0" allowfullscreen></iframe>';
            }
            break;
            
        case 'spotify':
            if (preg_match('/spotify\.com\/(album|playlist|track)\/([a-zA-Z0-9]+)/', $url, $matches)) {
                $type_spotify = $matches[1];
                $id = $matches[2];
                return '<iframe src="https://open.spotify.com/embed/' . esc_attr($type_spotify) . '/' . esc_attr($id) . '" width="100%" height="120" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
            }
            break;
            
        case 'soundcloud':
            // For SoundCloud, we need the embed URL which users should provide directly
            if (strpos($url, 'soundcloud.com') !== false) {
                return '<iframe width="100%" height="120" scrolling="no" frameborder="no" allow="autoplay" src="' . esc_url($url) . '"></iframe>';
            }
            break;
            
        default:
            // For custom embeds or anything else
            return wp_kses($url, array(
                'iframe' => array(
                    'src' => array(),
                    'width' => array(),
                    'height' => array(),
                    'frameborder' => array(),
                    'allowtransparency' => array(),
                    'allow' => array(),
                    'style' => array(),
                    'title' => array(),
                    'loading' => array(),
                    'scrolling' => array()
                )
            ));
    }
    
    return esc_html($url);
}

/**
 * Custom Theme Options
 */
function zivot_theme_customizer($wp_customize) {
    // Site Settings Section
    $wp_customize->add_section('zivot_site_settings', array(
        'title' => 'Nastavení webu',
        'priority' => 30,
    ));
    
    // Phone
    $wp_customize->add_setting('zivot_phone', array(
        'default' => '+420 727 273 372',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('zivot_phone', array(
        'label' => 'Telefon',
        'section' => 'zivot_site_settings',
        'type' => 'text',
    ));
    
    // Email
    $wp_customize->add_setting('zivot_email', array(
        'default' => 'cau@zivotjelajf.com',
        'sanitize_callback' => 'sanitize_email',
    ));
    
    $wp_customize->add_control('zivot_email', array(
        'label' => 'Email',
        'section' => 'zivot_site_settings',
        'type' => 'email',
    ));
    
    // Social Media URLs
    $wp_customize->add_setting('zivot_facebook', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw',
    ));
    
    $wp_customize->add_control('zivot_facebook', array(
        'label' => 'Facebook URL',
        'section' => 'zivot_site_settings',
        'type' => 'url',
    ));
    
    $wp_customize->add_setting('zivot_instagram', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw',
    ));
    
    $wp_customize->add_control('zivot_instagram', array(
        'label' => 'Instagram URL',
        'section' => 'zivot_site_settings',
        'type' => 'url',
    ));
    
    $wp_customize->add_setting('zivot_twitter', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw',
    ));
    
    $wp_customize->add_control('zivot_twitter', array(
        'label' => 'Twitter URL',
        'section' => 'zivot_site_settings',
        'type' => 'url',
    ));
}
add_action('customize_register', 'zivot_theme_customizer');

/**
 * Footer Email Form Handler
 */
function handle_footer_email_form() {
    if (!wp_verify_nonce($_POST['nonce'], 'zivot_nonce')) {
        wp_die('Security check failed');
    }
    
    $email = sanitize_email($_POST['email']);
    
    if (!is_email($email)) {
        wp_send_json_error('Neplatný email');
    }
    
    // Save to database
    global $wpdb;
    $table_name = $wpdb->prefix . 'footer_emails';
    
    $result = $wpdb->insert(
        $table_name,
        array(
            'email' => $email,
            'date_submitted' => current_time('mysql')
        )
    );
    
    if ($result === false) {
        wp_send_json_error('Chyba při ukládání');
    }
    
    // Send notification email
    $to = get_theme_mod('zivot_email', 'cau@zivotjelajf.com');
    $subject = 'Nová registrace z webu';
    $message = "Nová registrace z formuláře v patičce:\n\nEmail: " . $email . "\nDatum: " . current_time('mysql');
    
    wp_mail($to, $subject, $message);
    
    wp_send_json_success('Email byl úspěšně odeslán!');
}
add_action('wp_ajax_footer_email_form', 'handle_footer_email_form');
add_action('wp_ajax_nopriv_footer_email_form', 'handle_footer_email_form');

/**
 * Create database table for footer emails
 */
function create_footer_emails_table() {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'footer_emails';
    
    $charset_collate = $wpdb->get_charset_collate();
    
    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        email varchar(100) NOT NULL,
        date_submitted datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    ) $charset_collate;";
    
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}
register_activation_hook(__FILE__, 'create_footer_emails_table');

/**
 * WooCommerce Support
 */
function zivot_woocommerce_support() {
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
}
add_action('after_setup_theme', 'zivot_woocommerce_support');

// Remove WooCommerce default styles
add_filter('woocommerce_enqueue_styles', '__return_empty_array');

// Custom WooCommerce wrapper
remove_action('woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10);
remove_action('woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10);

add_action('woocommerce_before_main_content', 'zivot_woocommerce_wrapper_start', 10);
add_action('woocommerce_after_main_content', 'zivot_woocommerce_wrapper_end', 10);

function zivot_woocommerce_wrapper_start() {
    echo '<section class="section"><div class="container">';
}

function zivot_woocommerce_wrapper_end() {
    echo '</div></section>';
}

// Custom add to cart button text
add_filter('woocommerce_product_add_to_cart_text', 'zivot_custom_add_to_cart_text');
function zivot_custom_add_to_cart_text() {
    return 'Kup vinyl';
}

// Custom WooCommerce breadcrumbs
add_filter('woocommerce_breadcrumb_defaults', 'zivot_woocommerce_breadcrumbs');
function zivot_woocommerce_breadcrumbs() {
    return array(
        'delimiter'   => ' / ',
        'wrap_before' => '<nav class="woocommerce-breadcrumb">',
        'wrap_after'  => '</nav>',
        'before'      => '',
        'after'       => '',
        'home'        => 'Domů',
    );
}

// Czech WooCommerce text
add_filter('woocommerce_add_to_cart_message_html', 'zivot_woocommerce_czech_messages');
function zivot_woocommerce_czech_messages($message) {
    $message = str_replace('View cart', 'Zobrazit košík', $message);
    $message = str_replace('has been added to your cart', 'byl přidán do košíku', $message);
    return $message;
}

/**
 * Connect Vinyls to WooCommerce Products
 */
function zivot_create_woo_product_for_vinyl($post_id) {
    if (get_post_type($post_id) !== 'vinyl') {
        return;
    }
    
    // Check if WooCommerce product already exists
    $existing_product_id = get_post_meta($post_id, '_woocommerce_product_id', true);
    if ($existing_product_id && get_post($existing_product_id)) {
        return;
    }
    
    // Get vinyl data
    $vinyl_title = get_the_title($post_id);
    $vinyl_description = get_post_field('post_content', $post_id);
    $vinyl_price = get_post_meta($post_id, '_vinyl_price', true);
    $band_id = get_post_meta($post_id, '_vinyl_band', true);
    $band_name = $band_id ? get_the_title($band_id) : '';
    
    if ($band_name) {
        $product_title = $band_name . ' - ' . $vinyl_title;
    } else {
        $product_title = $vinyl_title;
    }
    
    // Create WooCommerce product
    $product_data = array(
        'post_title' => $product_title,
        'post_content' => $vinyl_description,
        'post_status' => 'publish',
        'post_type' => 'product'
    );
    
    $product_id = wp_insert_post($product_data);
    
    if ($product_id) {
        // Set product type to simple
        wp_set_object_terms($product_id, 'simple', 'product_type');
        
        // Set product price
        if ($vinyl_price) {
            update_post_meta($product_id, '_regular_price', $vinyl_price);
            update_post_meta($product_id, '_price', $vinyl_price);
        }
        
        // Set other product meta
        update_post_meta($product_id, '_visibility', 'visible');
        update_post_meta($product_id, '_stock_status', 'instock');
        update_post_meta($product_id, '_manage_stock', 'yes');
        update_post_meta($product_id, '_stock', '10'); // Default stock
        update_post_meta($product_id, '_sold_individually', 'no');
        update_post_meta($product_id, '_virtual', 'no');
        update_post_meta($product_id, '_downloadable', 'no');
        
        // Copy featured image
        if (has_post_thumbnail($post_id)) {
            $thumbnail_id = get_post_thumbnail_id($post_id);
            set_post_thumbnail($product_id, $thumbnail_id);
        }
        
        // Link vinyl to product
        update_post_meta($post_id, '_woocommerce_product_id', $product_id);
        update_post_meta($product_id, '_vinyl_id', $post_id);
        
        // Set product category
        wp_set_object_terms($product_id, 'vinyly', 'product_cat');
    }
}
add_action('save_post_vinyl', 'zivot_create_woo_product_for_vinyl');

// Update vinyl price in WooCommerce when changed
function zivot_sync_vinyl_price($post_id) {
    if (get_post_type($post_id) !== 'vinyl') {
        return;
    }
    
    $product_id = get_post_meta($post_id, '_woocommerce_product_id', true);
    if (!$product_id) {
        return;
    }
    
    $vinyl_price = get_post_meta($post_id, '_vinyl_price', true);
    if ($vinyl_price) {
        update_post_meta($product_id, '_regular_price', $vinyl_price);
        update_post_meta($product_id, '_price', $vinyl_price);
    }
}
add_action('save_post_vinyl', 'zivot_sync_vinyl_price');

/**
 * Custom vinyl buy button
 */
function zivot_vinyl_buy_button($post_id = null) {
    if (!$post_id) {
        $post_id = get_the_ID();
    }
    
    $product_id = get_post_meta($post_id, '_woocommerce_product_id', true);
    $buy_url = get_post_meta($post_id, '_vinyl_buy_url', true);
    
    if ($product_id && function_exists('wc_get_product')) {
        $product = wc_get_product($product_id);
        if ($product) {
            echo '<form class="cart" action="' . esc_url(apply_filters('woocommerce_add_to_cart_form_action', $product->get_permalink())) . '" method="post" enctype="multipart/form-data">';
            echo '<button type="submit" name="add-to-cart" value="' . esc_attr($product->get_id()) . '" class="btn btn-primary single_add_to_cart_button button alt">Kup vinyl - ' . $product->get_price_html() . '</button>';
            echo '</form>';
            return;
        }
    }
    
    if ($buy_url) {
        echo '<a href="' . esc_url($buy_url) . '" class="btn btn-primary" target="_blank" rel="noopener">Kup vinyl</a>';
    }
}

/**
 * Helper Functions
 */

// Get upcoming events
function get_upcoming_events($limit = 5) {
    $args = array(
        'post_type' => 'event',
        'posts_per_page' => $limit,
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
    );
    
    return get_posts($args);
}

// Get events for specific band
function get_band_events($band_id, $limit = 5) {
    $args = array(
        'post_type' => 'event',
        'posts_per_page' => $limit,
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
    );
    
    return get_posts($args);
}

// Format Czech date
function format_czech_date($date) {
    $months = array(
        1 => 'ledna', 2 => 'února', 3 => 'března', 4 => 'dubna',
        5 => 'května', 6 => 'června', 7 => 'července', 8 => 'srpna',
        9 => 'září', 10 => 'října', 11 => 'listopadu', 12 => 'prosince'
    );
    
    $timestamp = strtotime($date);
    $day = date('j', $timestamp);
    $month = $months[date('n', $timestamp)];
    
    return $day . '. ' . $month;
}

/**
 * Admin Menu for Email Submissions
 */
function add_email_submissions_menu() {
    add_menu_page(
        'Email registrace',
        'Email registrace',
        'manage_options',
        'email-submissions',
        'display_email_submissions',
        'dashicons-email-alt',
        30
    );
}
add_action('admin_menu', 'add_email_submissions_menu');

function display_email_submissions() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'footer_emails';
    
    $emails = $wpdb->get_results("SELECT * FROM $table_name ORDER BY date_submitted DESC");
    
    ?>
    <div class="wrap">
        <h1>Email registrace z patičky</h1>
        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Datum</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($emails as $email) : ?>
                <tr>
                    <td><?php echo esc_html($email->email); ?></td>
                    <td><?php echo esc_html($email->date_submitted); ?></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <?php
}
?>
