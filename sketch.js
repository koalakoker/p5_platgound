let klP;

function setup() {
  //createCanvas(window.innerWidth, window.innerHeight);
  const test = new Test();

  const consoleP = createP();
  consoleP.position(0, 20);
  let txt = "";

  klP = createP("KL");
  klP.position(0, 0);

  new ShortCut(new KeyState("z").addCtrl(), (k) => {
    txt += k.toString() + "<br>";
    consoleP.html(txt);
  });

  new ShortCut(new KeyState("Z").addCtrl().addShift(), (k) => {
    txt += k.toString() + "<br>";
    consoleP.html(txt);
  });

  new ShortCut(new KeyState("z").addMeta(), (k) => {
    txt += k.toString() + "<br>";
    consoleP.html(txt);
  });

  new ShortCut(new KeyState("z").addMeta().addShift(), (k) => {
    txt += k.toString() + "<br>";
    consoleP.html(txt);
  });
}

function draw() {
  background(0);
  klP.html("KL: " + kl.keyState.toString());
}
