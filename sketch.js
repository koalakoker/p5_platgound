let mover;
let target;

function setup() {
  createCanvas(400, 400);
  mover = new Mover(width / 2, height / 2);
}

function draw() {
  background(0);

  let force = createVector();
  let torque = 0;
  let torqueVal = 0.01;
  if (keyIsDown(LEFT_ARROW)) {
    torque -= torqueVal;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    torque += torqueVal;
  }
  mover.applyTorque(torque);

  if (keyIsDown(UP_ARROW)) {
    force.y -= 0.05;
  }

  if (keyIsDown(DOWN_ARROW)) {
    force.y += 0.05;
  }
  mover.applyForce(force);

  mover.update();
  mover.checkEdge();
  mover.display();
}
