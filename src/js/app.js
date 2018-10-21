var gradient = new gradient({
    inputs: {
        hue: "#input_hue",
        hueDistance: "#input_hueDistance",
        saturation: "#input_saturation",
        lightness: "#input_lightness",
        angle: "#input_angle"
    },
    callback: function (result) {
        var gradientString = gradient.getString();

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

        preview.style.background = gradientString;
        preview_text.value = `background: ${gradientString};`;

        input_hue.value = label_hue.value = result.hue;
        input_hueDistance.value = label_hueDistance.value = result.hueDistance;
        input_saturation.value = label_saturation.value = result.saturation;
        input_lightness.value = label_lightness.value = result.lightness;
        input_angle.value = label_angle.value = result.angle;
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
    preview_text.select();
    document.execCommand('copy');
};

function make_gradient(angle, h1, s1, l1, h2, s2, l2) {
    var canvas = document.createElement('canvas');
    canvas.id = "GradientTemp";

    var WIDTH = 1920,
        HEIGHT = 1080,
        HALF_WIDTH = WIDTH / 2,
        HALF_HEIGHT = HEIGHT / 2,
        x1 = HALF_WIDTH + Math.cos(angle) * HALF_WIDTH,
        y1 = HALF_HEIGHT - Math.sin(angle) * HALF_HEIGHT,
        x2 = HALF_WIDTH - Math.cos(angle) * HALF_WIDTH,
        y2 = HALF_HEIGHT + Math.sin(angle) * HALF_HEIGHT;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    //var x1=0, y1=0,length=L;// angle=138;
    var ctx = canvas.getContext('2d');
    var grd = ctx.createLinearGradient(x1, y1, x2, y2); //x1 + Math.cos(angle) * length, y1 - Math.sin(angle) * length);

    grd.addColorStop(0, "hsl(" + h1 + ", " + s1 + "%, " + l1 + "%)");
    grd.addColorStop(1, "hsl(" + h2 + ", " + s2 + "%, " + l2 + "%)");

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    return canvas;
};

function make_image(angle, h1, s1, l1, h2, s2, l2) {
    var canvas = make_gradient(angle, h1, s1, l1, h2, s2, l2),
        dataURL = canvas.toDataURL("image/png"),
        data = atob(dataURL.substring("data:image/png;base64,".length)),
        asArray = new Uint8Array(data.length),
        url = window.webkitURL || window.URL;

    for (var i = 0, len = data.length; i < len; ++i) {
        asArray[i] = data.charCodeAt(i);
    }

    var blob = new Blob([asArray.buffer], {
        type: "image/png"
    });

    var objectURL = url.createObjectURL(blob),
        a = document.createElement('a');

    document.body.appendChild(a);
    a.download = "gradient_" + Date.now();
    a.href = objectURL;
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(objectURL);
        canvas.remove();
    }, 100);
};

function download_gradient() {
    var lightness = label_lightness.value,
        saturation = label_saturation.value;

    make_image(label_angle.value, label_hue.value, saturation, lightness, label_hue.value - label_hueDistance.value, saturation, lightness);
};