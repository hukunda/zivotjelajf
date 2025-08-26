<?php get_header(); ?>

<section class="section">
    <div class="container">
        <div class="section-header">
            <h1>Blog</h1>
            <p>Nejnovější příspěvky a novinky</p>
        </div>
        
        <?php if (have_posts()) : ?>
            <div class="grid grid-2">
                <?php while (have_posts()) : the_post(); ?>
                <article class="card">
                    <?php if (has_post_thumbnail()) : ?>
                        <img src="<?php echo esc_url(get_the_post_thumbnail_url(get_the_ID(), 'medium')); ?>" alt="<?php echo esc_attr(get_the_title()); ?>" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                    <?php endif; ?>
                    
                    <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                    
                    <p class="small-text">
                        <?php echo esc_html(get_the_date('j.n.Y')); ?> | 
                        <?php echo esc_html(get_the_author()); ?>
                    </p>
                    
                    <p><?php echo wp_trim_words(get_the_excerpt(), 20); ?></p>
                    
                    <a href="<?php the_permalink(); ?>" class="btn btn-secondary">Číst více</a>
                </article>
                <?php endwhile; ?>
            </div>
            
            <div class="pagination">
                <?php
                the_posts_pagination(array(
                    'prev_text' => '← Předchozí',
                    'next_text' => 'Další →',
                ));
                ?>
            </div>
        <?php else : ?>
            <div class="card text-center">
                <h2>Zatím zde nejsou žádné příspěvky</h2>
                <p>Příspěvky budou přidány brzy. Sledujte naše stránky!</p>
                <a href="<?php echo esc_url(home_url('/')); ?>" class="btn btn-primary">Zpět na hlavní stránku</a>
            </div>
        <?php endif; ?>
    </div>
</section>

<?php get_footer(); ?>
