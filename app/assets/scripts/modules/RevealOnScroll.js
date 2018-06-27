import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
    constructor(classes, myOffset) {
        this.itemsToReveal = $(classes);
        this.hideInitially();
        this.createWaypoints(myOffset);
    }

    hideInitially() {
        this.itemsToReveal.addClass("reveal-item");
    }

    createWaypoints(x) {
        this.itemsToReveal.each(function(){
            var currentItem = this;
            new Waypoint({
                element: currentItem,
                handler: function() {
                    $(currentItem).addClass("reveal-item--is-visible")
                },
                offset: x
            });
        });
    }
}

export default RevealOnScroll;