var canvas = document.getElementById('main-canvas');
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var originX = window.innerWidth / 2;
var originY = window.innerHeight / 2;

scaleCanvas(canvas);

var squareSize = 5e4;

var mag = 200;
var xy = [0, 0];
var iteration = 0;
var step = 0.0006;

context.fillStyle = "rgba(0, 0, 0, 0.008)";

//var a = 0.97;
var a = getRandomInt(-4, 5);
//var b = -1.90;
var b = getRandomInt(-4, 5);
//var c = 1.38;
var c = getRandomInt(-4, 5);
//var d = -1.50;
var d = getRandomInt(-4, 5);

var up = false;

var divA = document.getElementById('a');
var divB = document.getElementById('b');
var divC = document.getElementById('c');
var divD = document.getElementById('d');

function render() {
  iteration += 1;
  //context.clearRect(0, 0, canvas.width, canvas.height);

  if (c >= 4) {
    up = false;
  } else if (c <= -4) {
    up = true;
  }

  up ? c += step
     : c -= step;

  up ? b += step 
     : b -= step;

  divA.innerHTML = a;
  divB.innerHTML = b;
  divC.innerHTML = c;
  divD.innerHTML = d;

  for (var i = 0; i < squareSize; i++) {
    fillFromAbsoluteOrigin(xy[0], xy[1]);
    xy = deJongIFS(xy[0], xy[1], a, b, c, d);
  }

  window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);

function fillFromAbsoluteOrigin(x, y) {
  x = (x * mag) + originX;
  y = (y * mag) + originY;
  context.fillRect(x, y, 1, 1);
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randNth() {
  var args = Array.prototype.slice.call(arguments);
  return args[getRandomInt(0, args.length)];
}

function sIFS(x, y) {
  var x2 = x / 2;
  var y2 = y / 2;

  return randNth(
    [x2, y2],
    [x2 + 0.5, y2 + 0.86],
    [x2 + 1.0, y2]
  );
}

function deJongIFS(x, y, a, b, c, d) {
  return [
    Math.sin(a * y) - Math.cos(b * x),
    Math.sin(c * x) - Math.cos(d * y)
  ];
}

// https://github.com/component/autoscale-canvas
function scaleCanvas(canvas){
  var ctx = canvas.getContext('2d');
  var ratio = window.devicePixelRatio || 1;
  if (1 != ratio) {
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
    canvas.width *= ratio;
    canvas.height *= ratio;
    ctx.scale(ratio, ratio);
  }
  return canvas;
};
