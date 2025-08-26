<?php get_header(); ?>

<?php while (have_posts()) : the_post(); ?>

<section class="section">
    <div class="container">
        <div class="card">
            <h1><?php the_title(); ?></h1>
            
            <div class="content">
                <?php the_content(); ?>
            </div>
            
            <?php 
            // Check if this is one of the special pages by slug and redirect to appropriate template
            $page_slug = get_post_field('post_name', get_post());
            
            if ($page_slug === 'o-zivote' || $page_slug === 'o-zivote') : ?>
                <!-- O ŽIVOTĚ content -->
                <div class="section">
                    <h2>CO NOVÝHO U ŽIVOTĚ</h2>
                    
                    <?php
                    $posts = get_posts(array(
                        'posts_per_page' => 6,
                        'orderby' => 'date',
                        'order' => 'DESC'
                    ));
                    
                    if (!empty($posts)) : ?>
                    <div class="grid grid-2">
                        <?php foreach ($posts as $post) :
                            setup_postdata($post);
                        ?>
                        <article class="card">
                            <h3><a href="<?php echo esc_url(get_permalink($post->ID)); ?>"><?php echo esc_html($post->post_title); ?></a></h3>
                            <p class="small-text">
                                Autor: <?php echo esc_html(get_the_author_meta('display_name', $post->post_author)); ?> | 
                                <?php echo esc_html(get_the_date('j.n.Y', $post->ID)); ?>
                            </p>
                            <p><?php echo wp_trim_words(get_the_excerpt($post->ID), 20); ?></p>
                            <a href="<?php echo esc_url(get_permalink($post->ID)); ?>" class="btn btn-secondary">Číst více</a>
                        </article>
                        <?php endforeach; wp_reset_postdata(); ?>
                    </div>
                    
                    <?php else : ?>
                    <div class="card text-center">
                        <h3>Zatím zde nejsou žádné příspěvky</h3>
                        <p>Příspěvky budou přidány brzy. Sledujte naše stránky!</p>
                    </div>
                    <?php endif; ?>
                </div>
                
                <div class="section">
                    <h2>Kontakty</h2>
                    
                    <div class="card">
                        <table class="events-table">
                            <tr>
                                <th>Adresa</th>
                                <td>Praha, Česká republika</td>
                            </tr>
                            <tr>
                                <th>Telefon</th>
                                <td><?php echo esc_html(get_theme_mod('zivot_phone', '+420 727 273 372')); ?></td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td><a href="mailto:<?php echo esc_attr(get_theme_mod('zivot_email', 'cau@zivotjelajf.com')); ?>"><?php echo esc_html(get_theme_mod('zivot_email', 'cau@zivotjelajf.com')); ?></a></td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="grid grid-4 mt-4">
                        <div class="card text-center">
                            <h3>Kdo je Lajf?</h3>
                            <p class="small-text">Zakladatel a srdce celého projektu</p>
                        </div>
                        
                        <div class="card text-center">
                            <h3>necum Cau</h3>
                            <p class="small-text">Kreativní ředitel a hudební nadšenec</p>
                        </div>
                        
                        <div class="card text-center">
                            <h3>Zdárek Bazarek</h3>
                            <p class="small-text">Manažer kapel a organizátor akcí</p>
                        </div>
                        
                        <div class="card text-center">
                            <h3>Haf Haf</h3>
                            <p class="small-text">Produkční a technický ředitel</p>
                        </div>
                    </div>
                </div>
                
            <?php elseif ($page_slug === 'kapely' || $page_slug === 'o-kapelach') : ?>
                <!-- Redirect to kapely functionality -->
                <script>window.location.href = '<?php echo esc_url(home_url('/kapely')); ?>';</script>
                
            <?php elseif ($page_slug === 'vinyly' || $page_slug === 'o-vinylech') : ?>
                <!-- Redirect to vinyly functionality -->
                <script>window.location.href = '<?php echo esc_url(home_url('/vinyly')); ?>';</script>
                
            <?php elseif ($page_slug === 'koncerty') : ?>
                <!-- Redirect to koncerty functionality -->
                <script>window.location.href = '<?php echo esc_url(home_url('/koncerty')); ?>';</script>
                
            <?php endif; ?>
            
        </div>
        
        <div class="text-center mt-4">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="btn btn-secondary">Zpět na hlavní stránku</a>
        </div>
    </div>
</section>

<?php endwhile; ?>

<?php get_footer(); ?>
