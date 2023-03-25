const loginUrl = "https://woven-name-321505.appspot.com/api/auth/";

window.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(loginUrl, email, password);
  }
});

async function login(url, email, password) {
  const body = { email: email, password: GCrypto.hash(password) };
  const response = await httpPost(url, JSON.stringify(body));
  const token = response.getResponseHeader("x-auth-token");
  if (!token) {
    console.log("Not authorized");
    return;
  }
  localStorage.setItem("x-auth-token", token);
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
          const status = xmlHttp.status;
          if (status >= 400 && status < 500) {
            reject("Client error:" + status);
          }
          if (status >= 500 && status < 600) {
            reject("Server error" + status);
          }
        }
      }
    };
    xmlHttp.open("POST", url, true);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(body);
  });
}
