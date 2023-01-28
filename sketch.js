function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  planeAngle = random(HALF_PI / 2);
  box = new Box(width / 2, height / 2, planeAngle);
}

function draw() {
  background(0);
  drawPlane(planeAngle);
  box.display();
}

function drawPlane(angle) {
  push();
  translate(width / 2, height / 2);
  rotate(angle);
  stroke(255);
  noFill();
  line(-width / 2, 0, width / 2, 0);
  pop();
}
