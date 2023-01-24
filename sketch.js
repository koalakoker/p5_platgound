let amplitude = 0;
let period = 120;

function setup() {
  createCanvas(800, 400);
  amplitude = width / 2 - 30;
}

function draw() {
  background(0);

  let x = amplitude * sin((TWO_PI * frameCount) / period);
  fill(255);
  stroke(255);
  strokeWeight(1);
  translate(width / 2, height / 2);
  circle(x, 0, 20);
  line(0, 0, x, 0);
}
