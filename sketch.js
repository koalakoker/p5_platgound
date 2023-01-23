let mover;

function setup() {
  createCanvas(800, 400);
  shoot();
}

function shoot() {
  mover = new Mover(width / 2, height);
  mover.applyForce(createVector(random(-5, 5), random(-7, -2)));
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
