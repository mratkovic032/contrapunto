$(window).on('load', function () {
    $('#loader').delay(100).fadeOut();
    $('#loader-holder').delay(150).fadeOut('slow');
    $('body').delay(150).css({'overflow': 'visible'});
});

$(document).ready(function() {

    $('#search-holder').fadeOut();
    $('.escape').click(function() {
        $('body').css({'overflow': 'visible'});
        $('#search-holder').fadeOut();

        const productsDiv = document.querySelector('#search-results');
        productsDiv.innerHTML = '';
        
        const insideDiv = document.createElement('div');
        insideDiv.classList.add("text-center", "col-lg-8", "offset-lg-2");
        insideDiv.style.fontSize = "18px";
        insideDiv.style.padding = "40px 0px 0px 0px";
        insideDiv.innerHTML = "Unesite ključnu reč u polje za unos kako biste izvršili pretragu...";
        productsDiv.appendChild(insideDiv);

        document.querySelector('#search').value = "";
    });   

    $("input[type='search'").click(function() {
        $('body').css({'overflow': 'hidden'});
        $('#search-holder').fadeIn('slow');
    });

    
    $('[data-toggle="tooltip"]').tooltip();
    
    var date = new Date();
    var year = date.getFullYear();
    $("#year").text(year);
    
    new WOW().init();
    
    $(".smooth-links, #to-top-button, a[href='#googleMap']").on('click', function (event) {        
        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({                
                scrollTop: $(hash).offset().top
            }, 1500, function () {
                window.location.hash = hash;
            });
        }
    });
    
    (function ($) {      
        $.fn.visible = function (partial) {
            var $t = $(this),
                    $w = $(window),
                    viewTop = $w.scrollTop(),
                    viewBottom = viewTop + $w.height(),
                    _top = $t.offset().top,
                    _bottom = _top + $t.height(),
                    compareTop = partial === true ? _bottom : _top,
                    compareBottom = partial === true ? _top : _bottom;

            return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
        };

    })(jQuery);

    var win = $(window);
    var work = $("#odometer-work");
    var customer = $("#odometer-customer");
    var article = $("#odometer-article");
    var delivery = $("#odometer-delivery");


    work.each(function (i, el) {
        var el = $(el);
        if (el.visible(true)) {
            setTimeout(function () {
                el.html(5);
            }, 500);

        }
    });
    customer.each(function (i, el) {
        var el = $(el);
        if (el.visible(true)) {
            setTimeout(function () {
                el.html(562);
            }, 500);

        }
    });
    article.each(function (i, el) {
        var el = $(el);
        if (el.visible(true)) {
            setTimeout(function () {
                el.html(94);
            }, 500);

        }
    });
    delivery.each(function (i, el) {
        var el = $(el);
        if (el.visible(true)) {
            setTimeout(function () {
                el.html(2000);
            }, 500);

        }
    });


    win.scroll(function (event) {

        work.each(function (i, el) {
            var el = $(el);
            if (el.visible(true)) {
                setTimeout(function () {
                    el.html(5);
                }, 200);

            }
        });
        customer.each(function (i, el) {
            var el = $(el);
            if (el.visible(true)) {
                setTimeout(function () {
                    el.html(562);
                }, 200);

            }
        });
        article.each(function (i, el) {
            var el = $(el);
            if (el.visible(true)) {
                setTimeout(function () {
                    el.html(94);
                }, 200);

            }
        });
        delivery.each(function (i, el) {
            var el = $(el);
            if (el.visible(true)) {
                setTimeout(function () {
                    el.html(2000);
                }, 200);

            }
        });
    });

    $(document).scroll(function () {

        var pos_checker = $("#pos-check");
        var offset = pos_checker.offset();
        var nav_bar = $("nav");
        var scroll_pos = $(document).scrollTop();

        if (scroll_pos >= offset.top) {
            nav_bar.addClass("sticky");
            pos_checker.css({"height": "42px"});
            $(".nav-link").addClass("nav-link-changed");
        } else {
            nav_bar.removeClass("sticky");
            pos_checker.css({"height": "0px"});
            $(".nav-link").removeClass("nav-link-changed");
        }

        if (scroll_pos > 370) {
            $("#to-top-button").css({"opacity": "1"});
        } else {
            $("#to-top-button").css({"opacity": "0"});
        }
    });

    $(".image-holder").click(function() {
        window.location = $(this).find("a").attr("href"); 
        return false;
    }); 
});