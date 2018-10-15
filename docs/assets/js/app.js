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

function make_gradient(angle,h1,s1,l1,h2,s2,l2){
    var canvas = document.createElement('canvas');
    canvas.id     = "CursorLayer";
    var W=1920, H=1080, L=2203;
    
    canvas.width  = W;
    canvas.height = H;

    var x=0, y=0,length=L;// angle=138;
    var ctx = canvas.getContext('2d');
    var grd = ctx.createLinearGradient(x,y,x + Math.cos(angle) * length, y - Math.sin(angle) * length);

    grd.addColorStop(0,"hsl("+h1+", "+s1+"%, "+l1+"%)");
    grd.addColorStop(1,"hsl("+h2+", "+s2+"%, "+l2+"%)");
    
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);
    
   return canvas;
}

function make_image(angle,h1,s1,l1,h2,s2,l2){
	canvas = make_gradient(angle,h1,s1,l1,h2,s2,l2);
  var dataURL = canvas.toDataURL( "image/png" );
  var data = atob( dataURL.substring( "data:image/png;base64,".length ) ),
      asArray = new Uint8Array(data.length);
  for( var i = 0, len = data.length; i < len; ++i ) {
      asArray[i] = data.charCodeAt(i);    
  }
  var blob = new Blob( [ asArray.buffer ], {type: "image/png"} );
  url  = (window.webkitURL || window.URL).createObjectURL( blob );

	a = document.createElement('a');
  document.body.appendChild(a);
  a.download = "gradient";
  a.href = url;
  a.click();
  setTimeout(function(){
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);  
      }, 100);  
}

function download_gradient(){
    angle = document.getElementById('input_angle').value;
    h1 = document.getElementById('input_hue').value;
    h2 = (document.getElementById('input_hue').value+document.getElementById('input_hueDistance').value)%360;
    l1 = document.getElementById('input_lightness').value;
    l2 = document.getElementById('input_lightness').value;
    s1 = document.getElementById('input_saturation').value;
    s2 = document.getElementById('input_saturation').value;
    make_image(angle,h1,s1,l1,h2,s2,l2);
}

