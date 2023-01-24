let mover;
let target;

function setup() {
  createCanvas(400, 400);
  mover = new Mover(random(width), random(height));
}

function draw() {
  background(0);

  let force = createVector();
  if (keyIsDown(LEFT_ARROW)) {
    force.x -= 0.05;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    force.x += 0.05;
  }

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
