let drawing;
let gui = new Gui(drawing);

function preload() {
  gui.setup();
  gui.preload();
}

function setup() {
  drawing = new Drawing(window.innerWidth, window.innerHeight);
  drawing.setup();
}

function draw() {
  drawing.display();
  gui.display();
}

function mouseMoved() {
  gui.mouseMoved();
}

function mousePressed() {
  if (gui.mousePressed() === false) {
    drawing.mousePressed();
  }
}

function mouseReleased() {
  gui.mouseReleased();
  drawing.mouseReleased();
}

function mouseDragged() {
  gui.mouseDragged();
  drawing.mouseDragged();
}

function keyPressed() {
  gui.keyPressed();
  drawing.keyPressed();
}
