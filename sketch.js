let drawing;

function preload() {
  const gui = Gui.getInstance();
  gui.preload();
}

function setup() {
  drawing = new Drawing(window.innerWidth, window.innerHeight);
  drawing.setup();
  const gui = Gui.getInstance();
  gui.setup();
}

function draw() {
  drawing.display();
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
    drawing.mousePressed();
  }
}

function mouseReleased() {
  const gui = Gui.getInstance();
  gui.mouseReleased();
  drawing.mouseReleased();
}

function mouseDragged() {
  const gui = Gui.getInstance();
  gui.mouseDragged();
  drawing.mouseDragged();
}
