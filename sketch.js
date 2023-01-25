let startAngle = 0;
let angleVel = 0.1;
let amplitude = 100;

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(0);
  let angle = startAngle;
  startAngle += 0.02;
  beginShape();
  for (let x = 0; x < width; x += 24) {
    let y = amplitude * sin(angle);
    noFill();
    stroke(255);
    strokeWeight(1);
    vertex(x, height / 2 + y);
    angle += angleVel;
  }
  endShape();
}
