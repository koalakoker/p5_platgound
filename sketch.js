function setup() {
  //createCanvas(window.innerWidth, window.innerHeight);
  const test = new Test();
  let p = createP();

  const shortCut1 = new ShortCut(
    new KeyState("z", false, false, true, false),
    (k) => {
      p.html(k.toString());
    }
  );

  const shortCut2 = new ShortCut(
    new KeyState("Z", false, false, true, true),
    (k) => {
      p.html(k.toString());
    }
  );
}

function draw() {
  background(0);
}
