class Liquid {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }
  display() {
    noStroke();
    fill(175);
    rect(this.x, this.y, this.w, this.h);
  }
  contains(mover) {
    let pos = mover.position;
    let radius = mover.radius;
    return (
      pos.x + radius > this.x &&
      pos.x - radius < this.x + this.w &&
      pos.y + radius > this.y &&
      pos.y - radius < this.y + this.h
    );
  }
  drag(mover) {
    let speed = mover.velocity.mag();
    let dragMagnitude = this.c * speed * speed;
    let drag = mover.velocity.copy();
    drag.setMag(-dragMagnitude);
    mover.applyForce(drag);
  }
}
class Mover {
  constructor(x, y, mass, bounce) {
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.speedLimit = 10;
    this.mass = mass;
    this.radius = 8 * this.mass;
    this.bounce = bounce;
  }
  applyForce(force) {
    force = p5.Vector.div(force, this.mass);
    this.acceleration.add(force);
  }
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.speedLimit);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  display() {
    stroke(0);
    fill(255);
    circle(this.position.x, this.position.y, this.radius * 2);
  }
  contactEdge() {
    return this.position.y > height - this.radius - 1;
  }

  checkEdge() {
    if (this.position.x < this.radius) {
      this.position.x = this.radius;
      this.velocity.x *= -this.bounce;
    }
    if (this.position.x > width - this.radius) {
      this.position.x = width - this.radius;
      this.velocity.x *= -this.bounce;
    }
    if (this.position.y < this.radius) {
      this.position.y = this.radius;
      this.velocity.y *= -this.bounce;
    }
    if (this.position.y > height - this.radius) {
      this.position.y = height - this.radius;
      this.velocity.y *= -this.bounce;
    }
  }
}

let movers = [];
let liquid;
let gravityDirection = 1;

function setup() {
  createCanvas(360, 640);
  for (let i = 0; i < 10; i++) {
    movers[i] = new Mover(i * 20, 0, random(0.1, 5), random(0.9));
  }
  liquid = new Liquid(0, height / 2, width, height / 2, 0.1);
}

let t = 0;

function draw() {
  background(0);
  liquid.display();
  movers.forEach((mover) => {
    if (liquid.contains(mover)) {
      liquid.drag(mover);
    }

    let gravity = createVector(0, gravityDirection * 0.1 * mover.mass);
    mover.applyForce(gravity);

    if (mouseIsPressed) {
      let forceMax = 10;
      let toss = createVector(
        random(forceMax * 2) - forceMax,
        random(forceMax * 2) - forceMax
      );
      mover.applyForce(toss);
    }

    if (mover.contactEdge()) {
      let c = 0.1;
      let friction = mover.velocity.copy();
      friction.mult(-1);
      friction.setMag(c);
      mover.applyForce(friction);
    }

    mover.checkEdge();
    mover.update();
    mover.display();
  });
}

function keyReleased() {
  if (gravityDirection === 1) {
    gravityDirection = -1;
  } else {
    gravityDirection = 1;
  }
  return false; // prevent any default behavior
}
