var gradient = (function() {
    var result = {
        hue: 0,
        hueDistance: 0,
        saturation: 0,
        lightness: 0,
        angle: 0
    };
    
    function inputHueChanged(e) {
        result.hue = e.target.value;
        gradient.prototype.callback(result);
    };

    function inputHueDistanceChanged(e) {
        result.hueDistance = e.target.value;
        gradient.prototype.callback(result);
    };

    function inputSaturationChanged(e) {
        result.saturation = e.target.value;
        gradient.prototype.callback(result);
    };

    function inputLightnessChanged(e) {
        result.lightness = e.target.value;
        gradient.prototype.callback(result);
    };

    function inputAngleChanged(e) {
        result.angle = e.target.value;
        gradient.prototype.callback(result);
    };
    
    function registerEvents(inputElements) {
        for(var i in inputElements) {
            var inputElement = document.querySelector(inputElements[i]);
                        
            switch(i) {
                case "hue":
                    inputElement.addEventListener(eventType, inputHueChanged, false);
                break;
                case "hueDistance":
                    inputElement.addEventListener(eventType, inputHueDistanceChanged, false);
                break;
                case "saturation":
                    inputElement.addEventListener(eventType, inputSaturationChanged, false);
                break;
                case "lightness":
                    inputElement.addEventListener(eventType, inputLightnessChanged, false);
                break;
                case "angle":
                    inputElement.addEventListener(eventType, inputAngleChanged, false);
                break;
                default:
                    throw new Error("Type not found!");
                break;
            }
        }
    };

    function gradient(options) {
        gradient.prototype.callback = options.callback;
        registerEvents(options.inputs);
    };

    gradient.prototype.init = function() {
        //TODO
    };
    
    return gradient;
})();