var gradient = new gradient({
    inputs: {
        hue: "#input_hue",
        hueDistance: "#input_hueDistance",
        saturation: "#input_saturation",
        lightness: "#input_lightness",
        angle: "#input_angle"
    },
    callback: function (result) {
        var hue_1 = result.hue;
        var hue_2 = result.hue - result.hueDistance;
        var angle = `${result.angle}deg`;
        var saturation = `${result.saturation}%`;
        var lightness = `${result.lightness}%`;

        if (result.lightness < 30) {
            preview_text.style.color = "#fff";
            document.querySelectorAll("label").forEach(function (e) {
                e.style.color = "#fff";
            });
        } else {
            preview_text.style.color = "#000";
            document.querySelectorAll("label").forEach(function (e) {
                e.style.color = "#000";
            });
        }

        var random_gradient = `linear-gradient(${angle}, hsl(${hue_1}, ${saturation}, ${lightness}), hsl(${hue_2}, ${saturation}, ${lightness}))`;

        preview.style.background = random_gradient;
        preview_text.innerText = `${random_gradient};`;

        label_hue.value = result.hue;
        label_hueDistance.value = result.hueDistance;
        label_saturation.value = result.saturation;
        label_lightness.value = result.lightness;
        label_angle.value = result.angle;
    }
});

gradient.init();

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

var randomize = function () {
    gradient.setValues({
        hue: getRndInteger(0, 180),
        hueDistance: getRndInteger(45, 90),
        saturation: getRndInteger(40, 80),
        lightness: getRndInteger(30, 75),
        angle: getRndInteger(0, 360)
    });
};

randomize();

var flipPanel = function () {
    flipper.classList.toggle("flipped");
};

var copySnippet = function () {
    const x = document.createElement('textarea');
    document.body.appendChild(x);
    x.value = document.getElementById('preview_text').innerHTML;
    x.select();
    document.execCommand('copy');
    document.body.removeChild(x);
};