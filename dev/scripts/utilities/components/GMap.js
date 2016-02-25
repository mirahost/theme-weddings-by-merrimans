/* ==========================================================================
                                Gmap Component
   ========================================================================== */

/**
 * Gmap Component. Add a google map to any component by adding data-gmap and 
 * data-coord="latitude,longitude". you can also specify the zoom level
 * by adding data-zoom="level". you can specify a fixed height by adding
 * data-height or you can specify to use foundation's 'flex-video' css class.
 * 
 * The map will be surrounded by a div.gmap-container container.
 *
 * IT IS NECESSARY TO EXECUTE Gmap.init() TO BOOT THE SYSTEM. BUT IT IS NOT 
 * NECESSARY TO ADD GOOGLE MAPS CDN URL. THE PLUGIN WILL ADD AUTOMATICALLY.
 */

/* Resize Class Declaration */
var Gmap = function() {};

/* Gmap init: Load google map api and attach a map to all data-gmap element */
Gmap.init = function() {

    var els = $('[data-gmap]');

    if(els.length <= 0 ) 
        return;

    $.getScript('//maps.google.com/maps/api/js', function(){

        els.each(function(){

            try{
                var el = $(this);

                var coord = el.data('coord').split(',');

                var lat = coord[0], lon = coord[1];

                var zoom = el.data('zoom');

                zoom = zoom == undefined || zoom == "" ? 15 : zoom;

                Gmap.add(el, lat, lon, zoom);

            }catch(e){
                console.log(e.stack);
            }
        });

    });
};

/* Gmap add: Attach a map to all an element */
Gmap.add = function(obj, lat, lon, zoom) {

    var coord = new google.maps.LatLng(lat, lon);

    var options = {
        zoom: zoom,
        center: coord,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    var container = $('<div class="gmap-container"></div>');

    if(obj.is('[data-height]'))
    {
        container.css('height', obj.data('height'));
    }

    if(obj.is('[data-flex]'))
    {
        container.addClass('flex-video');
    }

    var map = new google.maps.Map(container.get(0), options);

    var marker = new google.maps.Marker({
        position: coord,
        map: map
    });

    $(window).resize(function(){
        google.maps.event.trigger(map,'resize');
        map.setZoom( map.getZoom() );
        map.setCenter(marker.getPosition());
    });

    container.appendTo(obj);

    return [map, marker];
};