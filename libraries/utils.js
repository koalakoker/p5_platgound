function rand(min, max) {
  return Math.random() * (max - min) + min;
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
