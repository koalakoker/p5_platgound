function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  pendulum = new Pendulum();
}

function draw() {
  background(0);
  if (mouseIsPressed) {
    mousePos = createVector(mouseX, mouseY);
    let dist = p5.Vector.sub(pendulum.origin, mousePos);
    pendulum.angle = -dist.heading() - HALF_PI;
    pendulum.r = dist.mag();
  } else {
    pendulum.update();
  }
  pendulum.display();
}
