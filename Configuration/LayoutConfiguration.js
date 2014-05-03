define(["require", "exports"], function(require, exports) {
    var LayoutConfiguration = (function () {
        function LayoutConfiguration() {
        }
        LayoutConfiguration.layouts = {
            standard: {
                sections: [1, 2, 3, 4],
                image: {
                    layouts: ["slim", "vertical", "horizontal", "double", "wide"],
                    positions: ["left", "top", "right", "bottom", "center"]
                },
                title: {
                    sizes: ["small", "normal", "large", "extraLarge", "big", "extraBig"],
                    layouts: ["standard", "ocean", "desert", "winter", "dark"]
                }
            }
        };
        return LayoutConfiguration;
    })();

    
    return LayoutConfiguration;
});
