let amplitude = 0;
let period = 120;

function setup() {
  createCanvas(400, 600);
}

function draw() {
  background(0);

  let y = map(sin((TWO_PI * frameCount) / period), -1, 1, -100, 100);
  fill(255);
  stroke(255);
  strokeWeight(1);
  circle(width / 2, height / 2 + y, 20);
  line(width / 2, 0, width / 2, height / 2 + y);
}
