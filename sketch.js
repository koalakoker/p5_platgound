let drawElement = [];
let dragging = false;
let state = new stateAddCircle();

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  for (let i = 0; i < drawElement.length; i++) {
    const element = drawElement[i];
    element.draw();
  }
  state.draw();
}

function mousePressed() {
  dragging = true;
  state.mousePressed();
}

function mouseReleased() {
  dragging = false;
  drawElement.push(state.mouseReleased());
}

function mouseDragged() {
  if (dragging) {
    state.mouseDragged();
  }
}
