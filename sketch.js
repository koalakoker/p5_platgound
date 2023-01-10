let p;
let count = 0.0;

function setup() {
  createCanvas(400, 400);
  p = createP();
}

function draw() {
  count += deltaTime / 1000;
  background(220);
  p.html("Time:" + nf(count, 0, 2));
}
