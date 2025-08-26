<?php get_header(); ?>

<?php while (have_posts()) : the_post(); ?>

<section class="section">
    <div class="container">
        <article class="card">
            <?php if (has_post_thumbnail()) : ?>
                <div class="post-thumbnail mb-4">
                    <img src="<?php echo esc_url(get_the_post_thumbnail_url(get_the_ID(), 'large')); ?>" alt="<?php echo esc_attr(get_the_title()); ?>" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px;">
                </div>
            <?php endif; ?>
            
            <h1><?php the_title(); ?></h1>
            
            <div class="post-meta mb-3">
                <p class="small-text">
                    Publikováno: <?php echo esc_html(get_the_date('j.n.Y')); ?> | 
                    Autor: <?php echo esc_html(get_the_author()); ?>
                    <?php if (has_category()) : ?>
                        | Kategorie: <?php the_category(', '); ?>
                    <?php endif; ?>
                </p>
            </div>
            
            <div class="content">
                <?php the_content(); ?>
            </div>
            
            <?php if (has_tag()) : ?>
                <div class="post-tags mt-4">
                    <p><strong>Tagy:</strong> <?php the_tags('', ', ', ''); ?></p>
                </div>
            <?php endif; ?>
            
            <div class="post-navigation mt-4">
                <?php
                $prev_post = get_previous_post();
                $next_post = get_next_post();
                ?>
                
                <?php if ($prev_post || $next_post) : ?>
                    <div class="grid grid-2">
                        <div>
                            <?php if ($prev_post) : ?>
                                <a href="<?php echo esc_url(get_permalink($prev_post->ID)); ?>" class="btn btn-secondary">
                                    ← <?php echo esc_html($prev_post->post_title); ?>
                                </a>
                            <?php endif; ?>
                        </div>
                        <div class="text-right">
                            <?php if ($next_post) : ?>
                                <a href="<?php echo esc_url(get_permalink($next_post->ID)); ?>" class="btn btn-secondary">
                                    <?php echo esc_html($next_post->post_title); ?> →
                                </a>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </article>
        
        <div class="text-center mt-4">
            <a href="<?php echo esc_url(home_url('/blog')); ?>" class="btn btn-primary">Zpět na blog</a>
        </div>
    </div>
</section>

<?php endwhile; ?>

<?php get_footer(); ?>
