var canvas = document.getElementById('main-canvas');
var context = canvas.getContext("2d");

var originX = 400;
var originY = 400;
var squareSize = 5e4;

var mag = 1e2;
var xy = [0, 0];

context.fillStyle = "#444";

var a = 0.97;
var b = -1.90;
var c = 1.38;
var d = -1.50;

var up = true;

var divA = document.getElementById('a');
var divB = document.getElementById('b');
var divC = document.getElementById('c');
var divD = document.getElementById('d');

setInterval(function () {

  context.clearRect(0, 0, canvas.width, canvas.height);

  if (c >= 4) {
    up = false;
  } else if (c <= -4) {
    up = true;
  }

  up ? c += 0.01
     : c -= 0.01;

  up ? b += 0.01
     : b -= 0.01;

  divA.innerHTML = a;
  divB.innerHTML = b;
  divC.innerHTML = c;
  divD.innerHTML = d;

  for (var i = 0; i < squareSize; i++) {
    fillFromAbsoluteOrigin(xy[0], xy[1]);
    xy = deJongIFS(xy[0], xy[1], a, b, c, d);
  }
}, 100);

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
