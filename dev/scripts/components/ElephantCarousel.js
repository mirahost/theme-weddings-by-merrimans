/* ==========================================================================
                            Elephant Carousel Component
   ========================================================================== */

/* 
    Insert a single item slide that has the same height of the window.
    it will resizes according to the window as well.
*/

var ElephantCarousel = function() {};

ElephantCarousel.init = function() {
    $('[data-elephant-carousel]').each(function(){
        $(this).height($(window).height());

        $(this).addClass('owl-carousel owl-theme elephant-carousel');

        $(this).owlCarousel({
            singleItem : true,
            autoPlay : true,

            transitionStyle: "fade",
            // Navigation
            navigation : false,
            //Pagination
            pagination : false,

            mouseDrag: false,

            touchDrag: false
        });
    });

    $(window).resize(function(){
        $('[data-elephant-carousel]').each(function(){
            $(this).height($(window).height());
        });      
    });
};