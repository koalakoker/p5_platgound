function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  pendulum = new Pendulum();
  pendulum.addChild(new Pendulum(pendulum));
}

function draw() {
  background(0);
  if (mouseIsPressed) {
    mousePos = createVector(mouseX, mouseY);
    let dist = p5.Vector.sub(pendulum.origin, mousePos);
    pendulum.angle = -dist.heading() - HALF_PI;
    pendulum.r = dist.mag();
    pendulum.aVelocity = 0;
  } else {
    pendulum.update();
  }
  pendulum.display();
}
