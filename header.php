<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header">
    <div class="container">
        <div class="header-content">
            <div class="site-branding">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="site-title">
                    ŽIVOT JE LAJF
                </a>
            </div>
            
            <nav class="main-nav">
                <ul>
                    <li><a href="<?php echo esc_url(get_permalink(get_page_by_path('o-zivote'))) ?: home_url('/o-zivote'); ?>">O ŽIVOTĚ</a></li>
                    <li><a href="<?php echo esc_url(get_permalink(get_page_by_path('kapely'))) ?: home_url('/kapely'); ?>">O KAPELÁCH</a></li>
                    <li><a href="<?php echo esc_url(get_permalink(get_page_by_path('vinyly'))) ?: home_url('/vinyly'); ?>">O VINYLECH</a></li>
                </ul>
            </nav>
        </div>
    </div>
</header>

<main class="site-main">
