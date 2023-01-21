let movers = [];
let actractors = [];

function setup() {
  createCanvas(400, 400);
  movers = new Array(20);
  for (let i = 0; i < movers.length; i++) {
    movers[i] = new Mover(random(width), random(height));
  }
  actractors = new Array(6);
  for (let i = 0; i < actractors.length; i++) {
    actractors[i] = createVector(random(width), random(height));
  }
}

function draw() {
  background(0);

  stroke(0, 255, 0);
  strokeWeight(4);
  for (let i = 0; i < actractors.length; i++) {
    point(actractors[i].x, actractors[i].y);
  }

  for (let i = 0; i < movers.length; i++) {
    mover = movers[i];
    for (let i = 0; i < actractors.length; i++) {
      mover.actraction(actractors[i]);
    }
    mover.update();
    mover.display();
  }
}
