let r = 0;
let theta = 0;

function setup() {
  createCanvas(400, 400);
  background(0);
}

function draw() {
  let x = cos(theta) * r;
  let y = sin(theta) * r;
  fill(255);
  noStroke();
  circle(width / 2 + x, height / 2 + y, 16);

  theta += 0.01;
  r += 0.05;
}
