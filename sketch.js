let mover;
let target;

function setup() {
  createCanvas(400, 400);
  mover = new Mover(width / 2, height / 2);
}

function draw() {
  background(0);

  let aVelocity = 0;
  let aVelocityVal = 0.1;
  if (keyIsDown(LEFT_ARROW)) {
    aVelocity -= aVelocityVal;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    aVelocity += aVelocityVal;
  }
  mover.aVelocity = aVelocity;

  let thrust = 0;
  if (keyIsDown(UP_ARROW)) {
    thrust += 0.1;
  }
  if (keyIsDown(DOWN_ARROW)) {
    thrust -= 0.1;
  }
  let theta = mover.angle;
  let force = createVector(thrust * cos(theta), thrust * sin(theta));
  mover.applyForce(force);

  mover.update();
  mover.checkEdge();
  mover.display();
}
