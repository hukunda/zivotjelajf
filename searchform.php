<form role="search" method="get" class="search-form" action="<?php echo esc_url(home_url('/')); ?>">
    <div class="form-group">
        <input type="search" class="search-field" placeholder="Hledat..." value="<?php echo get_search_query(); ?>" name="s" />
        <button type="submit" class="btn btn-primary">Hledat</button>
    </div>
</form>
