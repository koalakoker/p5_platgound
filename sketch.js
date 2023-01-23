let bastLen = 100;
let aAcceleration = 0;
let aVelocity = 0;
let angle = 0;
let drag = 0.04;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  translate(200, 200);
  rotate(angle);
  stroke(255, 255, 255, 255);
  fill(100, 100, 100, 255);
  line(-bastLen / 2, 0, bastLen / 2, 0);
  circle(-bastLen / 2, 0, 16, 16);
  circle(bastLen / 2, 0, 16, 16);

  if (keyIsDown(LEFT_ARROW)) {
    aAcceleration -= 0.01;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    aAcceleration += 0.01;
  }

  dragForce = -aVelocity * drag;
  aAcceleration += dragForce;
  aVelocity += aAcceleration;
  aAcceleration = 0;
  angle += aVelocity;
}
