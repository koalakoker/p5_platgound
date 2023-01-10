function setup() {
  createCanvas(400, 400);
  movers = new Array(20);
  for (let i = 0; i < movers.length; i++) {
    movers[i] = new Mover(random(width), random(height));
    movers[i].velocity = createVector(random(10), random(10));
  }
  s = createSlider(0, 1, 0.5, 0.01);
  rectMode(CENTER);
}

function draw() {
  background(0);
  for (let i = 0; i < movers.length; i++) {
    mover = movers[i];
    mover.update();
    mover.checkEdge();
    mover.display();
  }
  count = s.value();
  stroke(255);
  fill(200);
  rect;
  rect(count * width, height - 50, 30, 10);
}
