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
  noStroke();
  circle(width / 2 - x, height / 2, 16);
}
