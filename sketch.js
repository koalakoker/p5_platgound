let drawing;
let gui = new Gui(drawing);

function preload() {
  gui.preload();
}

function setup() {
  drawing = new Drawing(window.innerWidth, window.innerHeight);
  drawing.setup();
}

function draw() {
  drawing.draw();
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
  if (gui.inside()) {
    gui.mouseReleased();
  }
  drawing.mouseReleased();
}

function mouseDragged() {
  drawing.mouseDragged();
}
