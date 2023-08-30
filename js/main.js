(function($) {
    "use strict";
    var cfg = {
        scrollDuration : 800,
        mailChimpURL   : ''
    },

    $WIN = $(window);

    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);

    var ssMenuOnScrolldown = function() {
        let header = $('.s-header');
        let headerTop = $('.s-header').offset().top;
        $WIN.on('scroll', function() {
            if ($WIN.scrollTop() > headerTop) {
                header.addClass('sticky');
            }
            else {
                header.removeClass('sticky');
            }
        });
    };

    var ssMobileMenu = function() {
        let toggleButton = $('.header-menu-toggle');
        let nav = $('.header-nav-wrap');
        toggleButton.on('click', function(event){
            event.preventDefault();
            toggleButton.toggleClass('is-clicked');
            nav.slideToggle();
        });
        if (toggleButton.is(':visible')) nav.addClass('mobile');
        $WIN.on('resize', function() {
            if (toggleButton.is(':visible')) nav.addClass('mobile');
            else nav.removeClass('mobile');
        });
        nav.find('a').on("click", function() {
            if (nav.hasClass('mobile')) {
                toggleButton.toggleClass('is-clicked');
                nav.slideToggle(); 
            }
        });
    };

    var ssWaypoints = function() {
        var sections = $(".target-section"),
            navigation_links = $(".header-main-nav li a");
        sections.waypoint( {
            handler: function(direction) {
                var active_section;
                active_section = $('section#' + this.element.id);
                if (direction === "up") active_section = active_section.prevAll(".target-section").first();
                var active_link = $('.header-main-nav li a[href="#' + active_section.attr("id") + '"]');
                navigation_links.parent().removeClass("current");
                active_link.parent().addClass("current");
            },
            offset: '25%'
        });
    };

    var ssMasonryFolio = function () {
        var containerBricks = $('.masonry');
        containerBricks.imagesLoaded(function () {
            containerBricks.masonry({
                itemSelector: '.masonry__brick',
                resize: true
            });
        });
    };

    var ssSmoothScroll = function() {
        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
            $target    = $(target);
                e.preventDefault();
                e.stopPropagation();
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }
                window.location.hash = target;
            });
        });

    };

    var ssAlertBoxes = function() {
        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        }); 
    };

    var ssAOS = function() {
        AOS.init( {
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });
    };

    (function clInit() {
        ssMenuOnScrolldown();
        ssMobileMenu();
        ssWaypoints();
        ssMasonryFolio();
        ssSmoothScroll();
        ssAlertBoxes();
        ssAOS();
    })();
})(jQuery);