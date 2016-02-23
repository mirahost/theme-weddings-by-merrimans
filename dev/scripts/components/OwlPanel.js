/* ==========================================================================
                        Owl Pane Component
   ========================================================================== */

var OwlPanel = function() {};

OwlPanel.setCurrentActive = function(owlPanel, current)
{
    owlPanel.find('.owl-panel-pagination li:nth-child('+current+')')
        .addClass('active')
        ;
};

OwlPanel.removeCurrentActive = function(owlPanel)
{
    owlPanel.find('.owl-panel-pagination li.active').removeClass('active');
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