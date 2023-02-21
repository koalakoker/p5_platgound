let klP;

function setup() {
  //createCanvas(window.innerWidth, window.innerHeight);
  const test = new Test();

  const consoleP = createP();
  consoleP.position(0, 20);
  let txt = "";

  klP = createP("KL");
  klP.position(0, 0);

  new ShortCut(new KeyState("z", false, false, true, false), (k) => {
    txt += k.toString() + "<br>";
    consoleP.html(txt);
  });

  new ShortCut(new KeyState("Z", false, false, true, true), (k) => {
    txt += k.toString() + "<br>";
    consoleP.html(txt);
  });

  new ShortCut(new KeyState("z", true, false, false, false), (k) => {
    txt += k.toString() + "<br>";
    consoleP.html(txt);
    // setTimeout(() => {
    //   kl.keyState = new KeyState();
    // }, 1000);
  });

  new ShortCut(new KeyState("z", true, false, false, true), (k) => {
    txt += k.toString() + "<br>";
    consoleP.html(txt);
  });
}

function draw() {
  background(0);
  klP.html("KL: " + kl.keyState.toString());
}
