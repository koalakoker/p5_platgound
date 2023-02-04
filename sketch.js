let drawing;
let bar = new Bar(0, 0);

function preload() {
  bar.preload();
}

function setup() {
  drawing = new Drawing(window.innerWidth, window.innerHeight);
  drawing.setup();
}

function draw() {
  drawing.draw();
  bar.display();
}

function mouseMoved() {
  bar.mouseMoved();
}

function mousePressed() {
  if (bar.inside()) {
    bar.mousePressed();
  } else {
    drawing.mousePressed();
  }
}

function mouseReleased() {
  drawing.mouseReleased();
}

function mouseDragged() {
  drawing.mouseDragged();
}
