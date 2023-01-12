let drawElement = [];
let dragging = false;
let newElement;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  for (let i = 0; i < drawElement.length; i++) {
    const element = drawElement[i];
    element.draw();
  }
  if (newElement) {
    newElement.draw();
  }
}

function mousePressed() {
  dragging = true;
  newElement = new Rectangle(mouseX, mouseY, mouseX, mouseY);
}

function mouseReleased() {
  dragging = false;
  drawElement.push(newElement);
}

function mouseDragged() {
  if (dragging) {
    newElement.x2 = mouseX;
    newElement.y2 = mouseY;
  }
}
