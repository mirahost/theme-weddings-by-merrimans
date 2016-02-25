/* ==========================================================================
                        Owl Pane Component
   ========================================================================== */

/* 
 *  Insert a panel over a owl Carousel and control its slide transitions.
 *  
 *  The structure is:
 *
 * data-owl-panel: it is the container that holds the carousel.
 * data-owl-prev: when it is clicked to go the previous slide.
 * data-owl-next: when it is clicked to go the next slide.
 * data-owl-pagination: it is the container that holds the pagination.
 *
 *
 *  IT IS NECESSARY TO EXECUTE OwlPanel.init() TO BOOT THE SYSTEM.
 */

var OwlPanel = function() {};

OwlPanel.setCurrentActive = function(owlPanel, current)
{
    owlPanel.find('[data-owl-pagination] > *:nth-child('+current+')')
        .addClass('active')
        ;
};

OwlPanel.removeCurrentActive = function(owlPanel)
{
    owlPanel.find('[data-owl-pagination] > *.active').removeClass('active');
};

OwlPanel.init = function() {
    $('[data-owl-panel]').each(function(){
        /* Get the Current Panel */
        var owlPanel = $(this);

        /* Get the Owl Carousel to control */
        var carousel = $(owlPanel.data('owl-panel')).data('owlCarousel');

        OwlPanel.setCurrentActive(owlPanel, carousel.owl.currentItem+1);

        carousel.reinit({
            afterMove: function() {
                OwlPanel.removeCurrentActive(owlPanel);

                OwlPanel.setCurrentActive(owlPanel, this.owl.currentItem+1);
            }
        });

        /* Set function to move the carousel to the previous slide */
        owlPanel.find('[data-owl-prev]').click(function(){
            carousel.prev();
        });

        /* Set function to move the carousel to the next slide */
        owlPanel.find('[data-owl-next]').click(function(){
            carousel.next();
        });
    });
};