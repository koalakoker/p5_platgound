let bastLen = 100;
let rot = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  translate(200, 200);
  rotate(rot);
  stroke(255);
  fill(100);
  line(-bastLen / 2, 0, bastLen / 2, 0);
  circle(-bastLen / 2, 0, 16, 16);
  circle(bastLen / 2, 0, 16, 16);

  if (keyIsDown(RIGHT_ARROW)) {
    rot += 0.1;
  }
  if (keyIsDown(LEFT_ARROW)) {
    rot -= 0.1;
  }
}
