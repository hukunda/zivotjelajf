<?php
/**
 * Plugin Name: Život je lajf - Google Calendar Sync
 * Plugin URI: https://zivotjelajf.com
 * Description: Synchronizuje koncerty z Google Calendar s WordPress custom post type Event
 * Version: 1.0.0
 * Author: Život je lajf
 * License: GPL v2 or later
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('ZIVOT_GC_PLUGIN_URL', plugin_dir_url(__FILE__));
define('ZIVOT_GC_PLUGIN_PATH', plugin_dir_path(__FILE__));

class ZivotGoogleCalendarSync {
    
    private $calendar_id;
    private $api_key;
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'admin_init'));
        add_action('wp_ajax_sync_google_calendar', array($this, 'sync_google_calendar'));
        add_action('zivot_gc_sync_cron', array($this, 'cron_sync_calendar'));
        
        // Schedule cron job
        if (!wp_next_scheduled('zivot_gc_sync_cron')) {
            wp_schedule_event(time(), 'hourly', 'zivot_gc_sync_cron');
        }
    }
    
    public function init() {
        $this->calendar_id = get_option('zivot_gc_calendar_id', '');
        $this->api_key = get_option('zivot_gc_api_key', '');
    }
    
    public function add_admin_menu() {
        add_options_page(
            'Google Calendar Sync',
            'Google Calendar',
            'manage_options',
            'zivot-google-calendar',
            array($this, 'admin_page')
        );
    }
    
    public function admin_init() {
        register_setting('zivot_gc_settings', 'zivot_gc_calendar_id');
        register_setting('zivot_gc_settings', 'zivot_gc_api_key');
        register_setting('zivot_gc_settings', 'zivot_gc_auto_sync');
        
        add_settings_section(
            'zivot_gc_main_section',
            'Nastavení Google Calendar',
            array($this, 'main_section_callback'),
            'zivot_gc_settings'
        );
        
        add_settings_field(
            'zivot_gc_api_key',
            'Google Calendar API Key',
            array($this, 'api_key_callback'),
            'zivot_gc_settings',
            'zivot_gc_main_section'
        );
        
        add_settings_field(
            'zivot_gc_calendar_id',
            'Calendar ID',
            array($this, 'calendar_id_callback'),
            'zivot_gc_settings',
            'zivot_gc_main_section'
        );
        
        add_settings_field(
            'zivot_gc_auto_sync',
            'Automatická synchronizace',
            array($this, 'auto_sync_callback'),
            'zivot_gc_settings',
            'zivot_gc_main_section'
        );
    }
    
    public function main_section_callback() {
        echo '<p>Nastavte zde přístup k vašemu Google Calendar pro automatickou synchronizaci koncertů.</p>';
    }
    
    public function api_key_callback() {
        $api_key = get_option('zivot_gc_api_key', '');
        echo '<input type="text" name="zivot_gc_api_key" value="' . esc_attr($api_key) . '" class="regular-text" />';
        echo '<p class="description">Získejte API klíč v Google Cloud Console - Calendar API</p>';
    }
    
    public function calendar_id_callback() {
        $calendar_id = get_option('zivot_gc_calendar_id', '');
        echo '<input type="text" name="zivot_gc_calendar_id" value="' . esc_attr($calendar_id) . '" class="regular-text" />';
        echo '<p class="description">ID kalendáře najdete v nastavení Google Calendar (např. example@gmail.com nebo verejny-kalendar-id)</p>';
    }
    
    public function auto_sync_callback() {
        $auto_sync = get_option('zivot_gc_auto_sync', '1');
        echo '<input type="checkbox" name="zivot_gc_auto_sync" value="1" ' . checked(1, $auto_sync, false) . ' />';
        echo '<label>Synchronizovat automaticky každou hodinu</label>';
    }
    
    public function admin_page() {
        ?>
        <div class="wrap">
            <h1>Google Calendar Sync</h1>
            
            <?php settings_errors(); ?>
            
            <form method="post" action="options.php">
                <?php
                settings_fields('zivot_gc_settings');
                do_settings_sections('zivot_gc_settings');
                submit_button();
                ?>
            </form>
            
            <h2>Manuální synchronizace</h2>
            <p>Klikněte na tlačítko níže pro okamžitou synchronizaci s Google Calendar:</p>
            <button id="sync-calendar" class="button button-primary">Synchronizovat nyní</button>
            <div id="sync-status"></div>
            
            <h2>Poslední synchronizace</h2>
            <?php
            $last_sync = get_option('zivot_gc_last_sync', '');
            if ($last_sync) {
                echo '<p>Poslední synchronizace: ' . esc_html($last_sync) . '</p>';
            } else {
                echo '<p>Zatím nebyla provedena žádná synchronizace.</p>';
            }
            ?>
            
            <h2>Synchronizované události</h2>
            <?php
            $synced_events = get_posts(array(
                'post_type' => 'event',
                'posts_per_page' => 10,
                'meta_query' => array(
                    array(
                        'key' => '_google_calendar_event_id',
                        'compare' => 'EXISTS'
                    )
                )
            ));
            
            if (!empty($synced_events)) {
                echo '<table class="wp-list-table widefat fixed striped">';
                echo '<thead><tr><th>Název</th><th>Datum</th><th>Google Event ID</th></tr></thead>';
                echo '<tbody>';
                foreach ($synced_events as $event) {
                    $event_date = get_post_meta($event->ID, '_event_date', true);
                    $google_id = get_post_meta($event->ID, '_google_calendar_event_id', true);
                    echo '<tr>';
                    echo '<td><a href="' . get_edit_post_link($event->ID) . '">' . esc_html($event->post_title) . '</a></td>';
                    echo '<td>' . esc_html($event_date) . '</td>';
                    echo '<td>' . esc_html($google_id) . '</td>';
                    echo '</tr>';
                }
                echo '</tbody></table>';
            } else {
                echo '<p>Zatím nejsou synchronizované žádné události z Google Calendar.</p>';
            }
            ?>
            
            <h2>Návod k nastavení</h2>
            <ol>
                <li><strong>Vytvořte Google Cloud projekt:</strong>
                    <ul>
                        <li>Jděte na <a href="https://console.cloud.google.com/" target="_blank">Google Cloud Console</a></li>
                        <li>Vytvořte nový projekt nebo vyberte existující</li>
                    </ul>
                </li>
                <li><strong>Povolte Calendar API:</strong>
                    <ul>
                        <li>V Google Cloud Console jděte na "APIs & Services" > "Library"</li>
                        <li>Vyhledejte "Google Calendar API" a povolte ho</li>
                    </ul>
                </li>
                <li><strong>Vytvořte API klíč:</strong>
                    <ul>
                        <li>Jděte na "APIs & Services" > "Credentials"</li>
                        <li>Klikněte "Create credentials" > "API key"</li>
                        <li>Zkopírujte API klíč a vložte ho do pole výše</li>
                    </ul>
                </li>
                <li><strong>Získejte Calendar ID:</strong>
                    <ul>
                        <li>Otevřte Google Calendar</li>
                        <li>V levém menu klikněte na tři tečky vedle názvu kalendáře</li>
                        <li>Vyberte "Settings and sharing"</li>
                        <li>Zkopírujte "Calendar ID" (v sekci "Integrate calendar")</li>
                    </ul>
                </li>
                <li><strong>Nastavte oprávnění kalendáře:</strong>
                    <ul>
                        <li>V nastavení kalendáře přejděte na "Access permissions"</li>
                        <li>Zaškrtněte "Make available to public" pro veřejný přístup</li>
                        <li>Nebo přidejte specifické uživatele s viewing permissions</li>
                    </ul>
                </li>
            </ol>
        </div>
        
        <script>
        jQuery(document).ready(function($) {
            $('#sync-calendar').on('click', function() {
                var button = $(this);
                var status = $('#sync-status');
                
                button.prop('disabled', true).text('Synchronizuji...');
                status.html('<p>Probíhá synchronizace...</p>');
                
                $.ajax({
                    url: ajaxurl,
                    type: 'POST',
                    data: {
                        action: 'sync_google_calendar',
                        nonce: '<?php echo wp_create_nonce('sync_calendar'); ?>'
                    },
                    success: function(response) {
                        if (response.success) {
                            status.html('<p style="color: green;">✓ ' + response.data.message + '</p>');
                            setTimeout(function() {
                                location.reload();
                            }, 2000);
                        } else {
                            status.html('<p style="color: red;">✗ ' + response.data + '</p>');
                        }
                    },
                    error: function() {
                        status.html('<p style="color: red;">✗ Chyba při synchronizaci</p>');
                    },
                    complete: function() {
                        button.prop('disabled', false).text('Synchronizovat nyní');
                    }
                });
            });
        });
        </script>
        <?php
    }
    
    public function sync_google_calendar() {
        if (!wp_verify_nonce($_POST['nonce'], 'sync_calendar')) {
            wp_send_json_error('Security check failed');
        }
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error('Insufficient permissions');
        }
        
        $result = $this->fetch_and_sync_events();
        
        if ($result['success']) {
            wp_send_json_success($result);
        } else {
            wp_send_json_error($result['message']);
        }
    }
    
    public function cron_sync_calendar() {
        if (get_option('zivot_gc_auto_sync', '1') == '1') {
            $this->fetch_and_sync_events();
        }
    }
    
    private function fetch_and_sync_events() {
        if (empty($this->api_key) || empty($this->calendar_id)) {
            return array(
                'success' => false,
                'message' => 'API klíč nebo Calendar ID nejsou nastavené'
            );
        }
        
        // Get events from Google Calendar
        $events = $this->fetch_google_calendar_events();
        
        if (!$events) {
            return array(
                'success' => false,
                'message' => 'Nepodařilo se načíst události z Google Calendar'
            );
        }
        
        $synced_count = 0;
        $updated_count = 0;
        
        foreach ($events as $google_event) {
            $result = $this->sync_single_event($google_event);
            if ($result['action'] == 'created') {
                $synced_count++;
            } elseif ($result['action'] == 'updated') {
                $updated_count++;
            }
        }
        
        // Update last sync time
        update_option('zivot_gc_last_sync', current_time('mysql'));
        
        return array(
            'success' => true,
            'message' => "Synchronizace dokončena. Vytvořeno: {$synced_count}, Aktualizováno: {$updated_count}"
        );
    }
    
    private function fetch_google_calendar_events() {
        $time_min = date('c'); // Current time in ISO 8601 format
        $time_max = date('c', strtotime('+1 year')); // One year from now
        
        $url = "https://www.googleapis.com/calendar/v3/calendars/" . urlencode($this->calendar_id) . "/events";
        $url .= "?key=" . $this->api_key;
        $url .= "&timeMin=" . urlencode($time_min);
        $url .= "&timeMax=" . urlencode($time_max);
        $url .= "&singleEvents=true";
        $url .= "&orderBy=startTime";
        $url .= "&maxResults=250";
        
        $response = wp_remote_get($url);
        
        if (is_wp_error($response)) {
            error_log('Google Calendar API Error: ' . $response->get_error_message());
            return false;
        }
        
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);
        
        if (!$data || !isset($data['items'])) {
            error_log('Google Calendar API: Invalid response - ' . $body);
            return false;
        }
        
        return $data['items'];
    }
    
    private function sync_single_event($google_event) {
        $google_id = $google_event['id'];
        
        // Check if event already exists
        $existing_post = get_posts(array(
            'post_type' => 'event',
            'posts_per_page' => 1,
            'meta_query' => array(
                array(
                    'key' => '_google_calendar_event_id',
                    'value' => $google_id,
                    'compare' => '='
                )
            )
        ));
        
        // Parse event data
        $event_data = $this->parse_google_event($google_event);
        
        if (!empty($existing_post)) {
            // Update existing event
            $post_id = $existing_post[0]->ID;
            wp_update_post(array(
                'ID' => $post_id,
                'post_title' => $event_data['title'],
                'post_content' => $event_data['description']
            ));
            
            $this->update_event_meta($post_id, $event_data);
            
            return array('action' => 'updated', 'post_id' => $post_id);
        } else {
            // Create new event
            $post_id = wp_insert_post(array(
                'post_type' => 'event',
                'post_title' => $event_data['title'],
                'post_content' => $event_data['description'],
                'post_status' => 'publish'
            ));
            
            if ($post_id) {
                update_post_meta($post_id, '_google_calendar_event_id', $google_id);
                $this->update_event_meta($post_id, $event_data);
                
                return array('action' => 'created', 'post_id' => $post_id);
            }
        }
        
        return array('action' => 'failed');
    }
    
    private function parse_google_event($google_event) {
        $title = isset($google_event['summary']) ? $google_event['summary'] : 'Untitled Event';
        $description = isset($google_event['description']) ? $google_event['description'] : '';
        $location = isset($google_event['location']) ? $google_event['location'] : '';
        
        // Parse start time
        $start_datetime = '';
        $start_date = '';
        $start_time = '';
        
        if (isset($google_event['start'])) {
            if (isset($google_event['start']['dateTime'])) {
                $start_datetime = $google_event['start']['dateTime'];
                $dt = new DateTime($start_datetime);
                $start_date = $dt->format('Y-m-d');
                $start_time = $dt->format('H:i');
            } elseif (isset($google_event['start']['date'])) {
                $start_date = $google_event['start']['date'];
            }
        }
        
        // Extract band name from title (you can customize this logic)
        $band_name = $this->extract_band_name($title);
        
        return array(
            'title' => $title,
            'description' => $description,
            'location' => $location,
            'date' => $start_date,
            'time' => $start_time,
            'band_name' => $band_name
        );
    }
    
    private function extract_band_name($title) {
        // Try to extract band name from title
        // This is a simple implementation - you can make it more sophisticated
        
        // Remove common concert-related words
        $clean_title = str_replace(array('koncert', 'concert', 'live', 'show'), '', strtolower($title));
        $clean_title = trim($clean_title);
        
        // If title contains " - ", use the first part as band name
        if (strpos($clean_title, ' - ') !== false) {
            $parts = explode(' - ', $clean_title);
            return trim($parts[0]);
        }
        
        return $clean_title;
    }
    
    private function update_event_meta($post_id, $event_data) {
        update_post_meta($post_id, '_event_date', $event_data['date']);
        update_post_meta($post_id, '_event_time', $event_data['time']);
        update_post_meta($post_id, '_event_venue', $event_data['location']);
        
        // Try to find matching band
        if (!empty($event_data['band_name'])) {
            $band = get_posts(array(
                'post_type' => 'band',
                'title' => $event_data['band_name'],
                'posts_per_page' => 1
            ));
            
            if (!empty($band)) {
                update_post_meta($post_id, '_event_band', $band[0]->ID);
            }
        }
    }
}

// Initialize the plugin
new ZivotGoogleCalendarSync();

// Deactivation hook to clear scheduled events
register_deactivation_hook(__FILE__, function() {
    wp_clear_scheduled_hook('zivot_gc_sync_cron');
});
?>
