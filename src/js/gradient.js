var gradient = (function() {
    var result = {
        hue: 0,
        hueDistance: 0,
        saturation: 0,
        lightness: 0,
        angle: 0
    };

    var eventType = "input";
    var _options = {};

    function gradient(options) {
        _options = options;

        gradient.prototype.callback = _options.callback;
        registerEvents(_options.inputs);
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
        for (var i in inputElements) {
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

    gradient.prototype.init = function() {
        for (var i in _options.inputs) {
            var inputElement = document.querySelector(_options.inputs[i]);
            
            if (result.i !== null) {
                result.i = inputElement.value;
            }
            else {
                throw new Error("Type not found!");
            }
        }
        gradient.prototype.callback(result);
    };

    gradient.prototype.setValues = function(newValues) {
        result = newValues;
        gradient.prototype.callback(result);
    }

    gradient.prototype.getString = function() {
        return `linear-gradient(${result.angle}deg, hsl(${result.hue}, ${result.saturation}%, ${result.lightness}%), hsl(${result.hue - result.hueDistance}, ${result.saturation}%, ${result.lightness}%))`;
    };
    
    return gradient;
})();