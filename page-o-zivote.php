<?php get_header(); ?>

<section class="section">
    <div class="container">
        <div class="card">
            <h1>O ŽIVOTĚ</h1>
            
            <div class="content">
                <p>Vítejte u "Život je lajf" - místa, kde se potkává láska k hudbě s profesionalitou a vášní pro nezapomenutelné zážitky. Naše společnost se specializuje na management hudebních kapel a organizaci koncertů, které zanechávají stopu v srdcích fanoušků.</p>
                
                <p>Věříme, že život je příliš krátký na špatnou hudbu. Proto se věnujeme pouze těm nejtalentovanějším umělcům, kteří dokáží oslovit publikum svou autenticitou a energií. Naše portfólio zahrnuje různorodé hudební styly - od undergroundových kapel až po etablované umělce, kteří už si získali své místo na hudební scéně.</p>
                
                <p>Naše služby zahrnují komplexní management kapel, organizaci koncertů a hudebních akcí, produkci vinylových nosičů a podporu začínajících umělců. Každý projekt přistupujeme s maximálním nasazením a pozorností k detailům, protože víme, že v hudbě záleží na každé nuanci.</p>
                
                <p>Máte kapelu a hledáte profesionální zastoupení? Plánujete hudební akci a potřebujete zkušené organizátory? Nebo prostě milujete dobrou hudbu a chcete být součástí našeho světa? Neváhejte nás kontaktovat. S námi bude vaše hudební cesta nezapomenutelná, protože… no, život je lajf!</p>
            </div>
        </div>
        
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
            
            <!-- Placeholder Content - Remove this section once you add real posts -->
            <div class="grid grid-2">
                <article class="card">
                    <h3><a href="#" style="color: #ff4444;">Končím s kuerulantama, jdu na solovou dráhu</a></h3>
                    <p class="small-text">
                        Autor: Lajf | <?php echo date('j.n.Y'); ?>
                    </p>
                    <p>Po letech společné cesty s kapelou se rozhodl jeden z našich umělců vydat na solovou dráhu. Přejeme mu hodně štěstí a těšíme se na nové projekty!</p>
                    <a href="#" class="btn btn-secondary">Číst více</a>
                </article>
                
                <article class="card">
                    <h3><a href="#" style="color: #ff4444;">nový koncertní turné kapely Hlučný Medvěd</a></h3>
                    <p class="small-text">
                        Autor: Management | <?php echo date('j.n.Y', strtotime('-2 days')); ?>
                    </p>
                    <p>Hlučný Medvěd oznámili nové koncertní turné po celé republice. Vstupenky v předprodeji už od příštího týdne. Nenechte si ujít tuto jedinečnou příležitost!</p>
                    <a href="#" class="btn btn-secondary">Číst více</a>
                </article>
                
                <article class="card">
                    <h3><a href="#" style="color: #ff4444;">nové album kapely Hlučný Medued</a></h3>
                    <p class="small-text">
                        Autor: Redakce | <?php echo date('j.n.Y', strtotime('-5 days')); ?>
                    </p>
                    <p>Dlouho očekávané album je konečně zde! 12 nových skladeb plných energie a originálních textů. Album je dostupný na vinylu i digitálně.</p>
                    <a href="#" class="btn btn-secondary">Číst více</a>
                </article>
                
                <article class="card">
                    <h3><a href="#" style="color: #ff4444;">Nové partnerství s underground labely</a></h3>
                    <p class="small-text">
                        Autor: Lajf | <?php echo date('j.n.Y', strtotime('-1 week')); ?>
                    </p>
                    <p>Navázali jsme nová partnerství s předními underground labely v Evropě. To znamená více příležitostí pro naše kapely a lepší distribuci.</p>
                    <a href="#" class="btn btn-secondary">Číst více</a>
                </article>
                
                <article class="card">
                    <h3><a href="#" style="color: #ff4444;">Život je lajf míří na letní festivaly</a></h3>
                    <p class="small-text">
                        Autor: Events | <?php echo date('j.n.Y', strtotime('-10 days')); ?>
                    </p>
                    <p>Naše kapely budou během léta vystupovat na několika významných festivalech. Připravujeme speciální stage s jedinečnou atmosférou.</p>
                    <a href="#" class="btn btn-secondary">Číst více</a>
                </article>
                
                <article class="card">
                    <h3><a href="#" style="color: #ff4444;">Podcast o underground scéně</a></h3>
                    <p class="small-text">
                        Autor: Media | <?php echo date('j.n.Y', strtotime('-2 weeks')); ?>
                    </p>
                    <p>Spustili jsme nový podcast, kde diskutujeme s našimi umělci o underground scéně, tvorbě a životě muzikanta. Nové epizody každý týden.</p>
                    <a href="#" class="btn btn-secondary">Číst více</a>
                </article>
            </div>
            
            <div class="card text-center mt-4" style="background: linear-gradient(135deg, #ff4444, #ff6666); color: white;">
                <h3>👆 Toto jsou ukázkové příspěvky</h3>
                <p><strong>Pro administrátora:</strong> Tyto placeholdery zmizí automaticky, jakmile přidáte první skutečný příspěvek v <code>Příspěvky → Přidat nový</code></p>
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
    </div>
</section>

<?php get_footer(); ?>
