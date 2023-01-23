let movers = [];
let target;

function setup() {
  createCanvas(400, 400);
  movers = new Array(20);
  for (let i = 0; i < movers.length; i++) {
    movers[i] = new Mover(random(width), random(height));
  }
  target = createVector(width / 2, height / 2);
}

function draw() {
  background(0);
  for (let i = 0; i < movers.length; i++) {
    mover = movers[i];

    mover.applyForce(p5.Vector.sub(mover.position, target).mult(0.0001));

    mover.update();
    mover.checkEdge();
    mover.display();
  }
}
