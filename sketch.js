function setup() {
  createCanvas(400, 400);
  p = createP();
  s = createSlider(0, 1, 0.5, 0.01);
  s.max = 2;
  rectMode(CENTER);
}

function draw() {
  count = s.value();
  background(0);
  p.html("Slider:" + nf(count, 0, 2));
  stroke(255);
  fill(200);
  rect;
  rect(count * width, height - 50, 30, 10);
}
