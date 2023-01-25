let angle = 0;
let angleVel = 0.4;
let amplitude = 100;

function setup() {
  createCanvas(800, 400);
  background(0);
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

function draw() {}
