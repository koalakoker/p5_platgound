let startAngle = 0;
let angleVel = 0.02;
let amplitude = 200;

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(0);
  let angle = startAngle;
  startAngle += 0.01;
  beginShape();
  for (let x = 0; x < width; x += 12) {
    let y = amplitude * map(noise(angle), 0, 1, -1, 1);
    noFill();
    stroke(255);
    strokeWeight(1);
    vertex(x, height / 2 + y);
    angle += angleVel;
  }
  endShape();
}
