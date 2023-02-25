let drawing;
let gui = new Gui(drawing);

function preload() {
  gui.preload();
}

function setup() {
  console.log("Setup...");
  drawing = new Drawing(window.innerWidth, window.innerHeight);
  drawing.setup();
  gui.setup();
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
