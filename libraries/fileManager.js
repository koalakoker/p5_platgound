const url = "http://192.168.0.15:3000/api/drawing";
//const url = "http://koalakoker.ddns.net:3000/api/drawing";

function logOut() {
  localStorage.clear();
}

function getFileNames() {
  return new Promise((resolve, reject) => {
    httpGet(url)
      .then((jsonText) => {
        const fileNames = [];
        const o = JSON.parse(jsonText);
        o.forEach((element) => {
          fileNames.push(element.name);
        });
        resolve(fileNames);
      })
      .catch((err) => {
        if (err === 401) {
          // Unauthorized
          logOut();
          window.location.replace("login.html");
        }

        if (err === 0) {
          console.log("Server not reachable");
          return;
        }
        console.log("Catch");
        console.log(err);
      });
  });
}

function saveFile(drawing) {
  const data = {
    name: "new file",
    drawing: drawing,
  };
  httpPost(url, JSON.stringify(data), (result) => {})
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
