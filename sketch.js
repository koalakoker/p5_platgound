let mover;

function setup() {
  createCanvas(400, 400);
  shoot();
}

function shoot() {
  mover = new Mover(0, height);
  mover.applyForce(createVector(random(0, 5), random(-5, 0)));
  mover.aAcceleration = mover.acceleration.x / 10;
}

function draw() {
  background(0);

  mover.applyForce(createVector(0, 0.1));

  mover.update();
  //mover.checkEdge();
  mover.display();

  if (mover.position.y >= height) {
    shoot();
  }
}
