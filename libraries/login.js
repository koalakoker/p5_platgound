function checkLogin() {
  if (!localStorage.getItem("x-auth-token")) {
    window.location.replace("login.html");
  }
}

function httpGet(url, cb) {
  return new Promise((resolve, reject) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
          const responseText = xmlHttp.responseText;
          if (cb) {
            cb(responseText);
          }
          resolve(responseText);
        } else {
          reject(xmlHttp.status);
        }
      }
    };
    xmlHttp.open("GET", url, true);
    const token = localStorage.getItem("x-auth-token");
    if (token) {
      xmlHttp.setRequestHeader("x-auth-token", token);
    }

    xmlHttp.send(null);
  });
}

function httpPost(url, body, cb) {
  return new Promise((resolve, reject) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
          const responseText = xmlHttp.responseText;
          if (cb) {
            cb(responseText);
          }
          resolve(xmlHttp);
        } else {
          reject(xmlHttp.status);
        }
      }
    };
    xmlHttp.open("POST", url, true);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    const token = localStorage.getItem("x-auth-token");
    if (token) {
      xmlHttp.setRequestHeader("x-auth-token", token);
    }
    xmlHttp.send(body);
  });
}
