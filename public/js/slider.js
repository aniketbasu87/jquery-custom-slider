(function ($) {
    var methods = {
        item_width: 0,
        options: null,
        init: function (_options) {
            var slider = this;
            this.options = $.extend({}, $.fn.slider.defaults, _options);
            this.item_width = slider.parent().outerWidth();
            slider.children("li").width(this.item_width).parent().width(this.item_width * slider.children("li").length);
            // We have more than one slide,
            if (slider.children("li").length > 1) {
                // Add previous/next buttons
                slider.parent().append(
                    '<a href="#" id="btn-prev"><i class="fa fa-angle-left"></i><span>Previous</span></a><a href="#" id="btn-next"><i class="fa fa-angle-right"></i><span>Next</span></a>'
                );

                // Handle clicks on the next button
                slider.parent().on("click", "a#btn-prev", function (e) {
                    e.preventDefault();
                    methods.slidePrev.call(slider);
                });

                // Handle clicks on the previous button
                slider.parent().on("click", "a#btn-next", function (e) {
                    e.preventDefault();
                    methods.slideNext.call(slider);
                });
            }
            return this;
        },
        slideNext: function () {
            this.animate({
                    left: -this.item_width,
                },
                this.options.duration,
                this.options.animationType,
                ()=>{
                    this.children("li:first").appendTo(this);
                    this.css("left", 0);
                }
            );
        },
        slidePrev: function () {
            this.children("li:last").prependTo(this);
            this.css("left", -this.item_width);

            this.animate({
                    left: 0,
                },
                this.options.duration,
                this.options.animationType
            );
        }
    };
    $.fn.slider = function (_method) {
        // Method calling logic
        if (methods[_method]) {
            return methods[_method].apply(
                this,
                Array.prototype.slice.call(arguments, 1)
            );
        } else if (typeof _method === "object" || !_method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Method " + _method + " does not exist on jQuery.slider");
        }
    };
    // default settings
    $.fn.slider.defaults = {
        animationType: "swing",
        duration: 300,
    };
})(jQuery);