function preload() {
  const gui = Gui.getInstance();
  gui.preload();
}

function setup() {
  Drawing.getInstance().setup();
  const gui = Gui.getInstance();
  gui.setup();
}

function draw() {
  Drawing.getInstance().display();
  const gui = Gui.getInstance();
  gui.display();
}

function mouseMoved() {
  const gui = Gui.getInstance();
  gui.mouseMoved();
}

function mousePressed() {
  const gui = Gui.getInstance();
  if (gui.mousePressed() === false) {
    Drawing.getInstance().mousePressed();
  }
}

function mouseReleased() {
  const gui = Gui.getInstance();
  gui.mouseReleased();
  Drawing.getInstance().mouseReleased();
}

function mouseDragged() {
  const gui = Gui.getInstance();
  gui.mouseDragged();
  Drawing.getInstance().mouseDragged();
}
