const width = 800;
const height = 600;
let mouseX = 400;
let mouseY = 300;

function isTypeOf(object, type) {
  return type.prototype.isPrototypeOf(object);
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}
function iRand(min, max) {
  return Math.floor(rand(min, max));
}
function round(x) {
  return Math.round(x);
}
function dist(x1, y1, x2, y2) {
  return test_p5.dist(x1, y1, x2, y2);
}

function color(r, g, b, a) {
  return { r: r, g: g, b: b, a: a };
}
function red(color) {
  return color.r;
}
function green(color) {
  return color.g;
}
function blue(color) {
  return color.b;
}
function alpha(color) {
  return color.a;
}
function brightness(color) {
  return test_p5.brightness(color);
}

let fillColor;
function fill(color) {
  fillColor = color;
}
function noFill() {
  fillColor = null;
}
function getFill() {
  return fillColor;
}
let strokeStyle = {};
function stroke(color) {
  strokeStyle.strokeColor = color;
}
function noStroke() {
  strokeStyle.strokeColor = null;
}
function getStroke() {
  return strokeStyle;
}
function strokeWeight(w) {
  strokeStyle.strokeWeight = w;
}

function httpGet(url, dataType, data, cbSuccess) {
  return new Promise((resolve, reject) => {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
      if (http.readyState == 4) {
        if (http.status == 200) {
          if (cbSuccess) {
            cbSuccess(http.responseText);
            resolve(http.responseText);
          }
        }
      }
    };
    http.onerror = () => {
      reject("Backend not available at: " + url);
    };
    http.open("GET", url, true);
    http.send(null);
  });
}
function httpPost(url, dataType, data, cbSuccess) {
  return new Promise((resolve, reject) => {
    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
      if (http.readyState == 4) {
        if (http.status == 200) {
          if (cbSuccess) {
            cbSuccess(http.responseText);
            resolve(http.responseText);
          }
        }
      }
    };
    http.onerror = () => {
      reject("Backend not available at: " + url);
    };
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.send(JSON.stringify(data));
  });
}

function createVector(x, y, z) {
  return test_p5.createVector(x, y, z);
}
function cos(x) {
  return test_p5.cos(x);
}
function sin(x) {
  return test_p5.cos(x);
}
function createCanvas() {}
function millis() {
  return test_p5.millis();
}

function collideRectCircle(ax1, ay1, ax2, ay2, cx, cy, cr) {
  return test_p5.collideRectCircle(ax1, ay1, ax2, ay2, cx, cy, cr);
}
function collideRectRect(x1, y1, w1, h1, x2, y2, w2, h2) {
  return test_p5.collideRectRect(x1, y1, w1, h1, x2, y2, w2, h2);
}

function reverse(a) {
  return test_p5.reverse(a);
}

let SHIFT = 16;
function keyIsDown(k) {
  return test_p5.keyIsDown(k);
}
