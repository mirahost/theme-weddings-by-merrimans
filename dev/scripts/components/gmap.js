/* ==========================================================================
                                Gmap Component
   ========================================================================== */

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