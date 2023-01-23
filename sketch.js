let bastLen = 100;
let aAcceleration = 0.0001;
let aVelocity = 0;
let angle = 0;

function setup() {
  createCanvas(400, 400);
  background(0);
}

function draw() {
  translate(200, 200);
  rotate(angle);
  stroke(255, 255, 255, 50);
  fill(100, 100, 100, 50);
  line(-bastLen / 2, 0, bastLen / 2, 0);
  circle(-bastLen / 2, 0, 16, 16);
  circle(bastLen / 2, 0, 16, 16);

  aVelocity += aAcceleration;
  angle += aVelocity;
}
