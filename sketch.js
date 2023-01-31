let drawing;

function setup() {
  drawing = new Drawing(window.innerWidth, window.innerHeight);
  drawing.setup();
}

function draw() {
  drawing.draw();
}

function mousePressed() {
  drawing.mousePressed();
}

function mouseReleased() {
  drawing.mouseReleased();
}

function mouseDragged() {
  drawing.mouseDragged();
}
