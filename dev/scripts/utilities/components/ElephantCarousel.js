/* ==========================================================================
                            Elephant Carousel Component
   ========================================================================== */

/* 
 *  Insert a single item slide Owl Carousel that has the same height of the window.
 *  Elephant Carousel will resize according to the window as well.
 *  
 *  You need to add data-elephant-carousel to the component that will hold the carousel.
 *
 *  IT IS NECESSARY TO EXECUTE ElephantCarousel.init() TO BOOT THE SYSTEM.
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