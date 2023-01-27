let root;
let level = 0;

function next(parent) {
  level++;
  if (level == 7) {
    return new Pendulum(parent);
  }
  let newNode = new Pendulum(parent);
  newNode.addChild(next(newNode));
  return newNode;
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  root = new Pendulum();
  root.addChild(next(root));
}

function draw() {
  background(0);
  if (mouseIsPressed) {
    mousePos = createVector(mouseX, mouseY);
    let dist = p5.Vector.sub(root.origin, mousePos);
    root.angle = -dist.heading() - HALF_PI;
    root.r = dist.mag();
    root.aVelocity = 0;
  } else {
    root.update();
  }
  root.display();
}
