//const url = "http://192.168.0.15:3000/api/drawing";
const url = "http://koalakoker.ddns.net:3000/api/drawing";

function logOut() {
  localStorage.clear();
}

function getFiles() {
  return new Promise((resolve, reject) => {
    httpGet(url)
      .then((jsonText) => {
        const files = [];
        const obj = JSON.parse(jsonText);
        obj.forEach((file) => {
          files.push({ name: file.name, id: file.id });
        });
        resolve(files);
      })
      .catch((err) => {
        if (err === 401) {
          // Unauthorized
          logOut();
          window.location.replace("login.html");
        }

        if (err === 0) {
          reject(1002);
          return;
        }
        console.log(err);
      });
  });
}

function saveFile(drawing, name) {
  const data = {
    name: name,
    drawing: drawing,
  };
  httpPost(url, JSON.stringify(data))
    .then(() => {
      Gui.getInstance().diagMngr.addMessage("Sketch has been saved");
    })
    .catch((err) => {
      if (err === 401) {
        // Unauthorized
        localStorage.clear();
        window.location.replace("login.html");
      }
      console.log(err);
    });
}

function removeFile(id) {
  return httpPost(url + "/" + id, null, null, "DELETE");
}

function loadFile(id) {
  return httpGet(url + "/" + id);
}

function getNow() {
  const today = new Date();
  const date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds();
  return date;
}
