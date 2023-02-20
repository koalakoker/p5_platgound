function setup() {
  //createCanvas(window.innerWidth, window.innerHeight);
  const test = new Test();
  let p = createP();
  p.position(0, 0);
  let txt = "";

  new ShortCut(new KeyState("z", false, false, true, false), (k) => {
    txt += k.toString() + "<br>";
    p.html(txt);
  });

  new ShortCut(new KeyState("Z", false, false, true, true), (k) => {
    txt += k.toString() + "<br>";
    p.html(txt);
  });

  new ShortCut(new KeyState("z", true, false, false, false), (k) => {
    txt += k.toString() + "<br>";
    p.html(txt);
  });

  new ShortCut(new KeyState("z", true, false, false, true), (k) => {
    txt += k.toString() + "<br>";
    p.html(txt);
  });
}

function draw() {
  background(0);
}
