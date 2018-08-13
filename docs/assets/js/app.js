var hueUpdated = function(e) {
    label_hue.value = input_hue.value;
    updateColor();
};

var hueDistanceUpdated = function(e) {
    label_hueDistance.value = input_hueDistance.value;
    updateColor();
};

var saturationUpdated = function(e) {
    label_saturation.value = input_saturation.value;
    updateColor();
};

var lightnessUpdated = function(e) {
    label_lightness.value = input_lightness.value;
    updateColor();
};

var angleUpdated = function(e) {
    label_angle.value = input_angle.value;
    updateColor();
}

var generateHue = function() {
    return Math.floor(Math.random() * 360);
};

var updateColor = function() {
    var hue_random1 = input_hue.value;
    var hue_random2 = input_hue.value - input_hueDistance.value;
    var angle = `${input_angle.value}deg`;
    var saturation = `${input_saturation.value}%`;
    var lightness = `${input_lightness.value}%`;

    var angleIndex = Math.floor(Math.random() * angle.length);
    var random_gradient = `linear-gradient(${angle}, hsl(${hue_random1}, ${saturation}, ${lightness}), hsl(${hue_random2}, ${saturation}, ${lightness}))`;
    
    preview.style.background = random_gradient;
    preview_text.innerText = `${random_gradient};`;

};

input_hue.addEventListener("input", hueUpdated);
input_hueDistance.addEventListener("input", hueDistanceUpdated);
input_saturation.addEventListener("input", saturationUpdated);
input_lightness.addEventListener("input", lightnessUpdated);
input_angle.addEventListener("input", angleUpdated);

hueUpdated();
hueDistanceUpdated();
saturationUpdated();
lightnessUpdated();
angleUpdated();

updateColor();

var g = new gradient({
    inputs: {
        hue: "#input_hue",
        hueDistance: "#input_hueDistance",
        saturation: "#input_saturation",
        lightness: "#input_lightness",
        angle: "#input_angle"
    },
    callback: function(result) {
        console.log(result);
    }
});
g.init();