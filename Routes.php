<?php
    return [        
        # Api routes:
        App\Core\Route::get('@^api/search/([a-zA-Z]+|[a-zA-Z]+ [a-zA-Z]+)/?$@',  'ApiSearch',     'quickSearch'),

        #User routes:
        App\Core\Route::get('|^category/([0-9]+/?)$|', 'Category', 'show'),

        App\Core\Route::any('|^.*$|',		'Main',		'home')
    ];