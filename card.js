'use strict';

var $body = document.getElementsByClassName('body__inner')[0];
var colors = [
  [177,177,190],
  [227,181,161],
  [236,201,136],
  [159,214,225],
  [177,177,190],
  [227,181,161]
];
var colorLen = colors.length;
var step = 0;
var colorIndices = new Array(colorLen - 1).join().split(',').map(function (v, i) {
  return i;
});
var gradientSpeed = 0.01; //transition speed

var getColor = function getColor(color1, color2) {
  var r_step = 1 - step;
  var rgb = color1.map(function (v, i) {
    return ~~(r_step * color1[i] + step * color2[i]);
  }).join();
  return 'rgb(' + rgb + ')';
};

var upodateColorIdx = function upodateColorIdx() {
  colorIndices.forEach(function (v, i) {
    if (i % 2) {
      colorIndices[i] = ~~(colorIndices[i - 1] + Math.random() * (colorLen - 1) + 1) % colorLen;
    } else {
      colorIndices[i] = colorIndices[(i + 1) % (colorLen - 1)];
    }
  });
};

var Gradient = function Gradient() {
  var colorNow = colorIndices.map(function (v) {
    return colors[v];
  });
  var color1 = getColor(colorNow[0], colorNow[1]);
  var color2 = getColor(colorNow[1], colorNow[2]);
  var color3 = getColor(colorNow[2], colorNow[3]);

  $body.style.backgroundImage = 'linear-gradient(to right bottom, ' + color1 + ', ' + color3 +')';

  step += gradientSpeed;
  if (step >= 1) {
    step %= 1;
    upodateColorIdx();
  }
};

window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

(function animloop() {
  requestAnimFrame(animloop);
  Gradient();
})();