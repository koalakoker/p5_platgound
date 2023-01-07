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
    let speedSquare = speed * speed;
    let dragMagnitude =
      this.c * speedSquare * (mover.radius / 16) * (mover.radius / 16);
    let drag = mover.velocity.copy();
    drag.setMag(-dragMagnitude);
    mover.applyForce(drag);
    // Lift Force
    let lift = mover.velocity.copy();
    lift.rotate(HALF_PI);
    let liftMagnitude = mover.liftCoeff * speedSquare;
    lift.setMag(liftMagnitude);
    mover.applyForce(lift);
  }
}
class Mover {
  constructor(x, y, mass, bounce) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector();
    this.speedLimit = 10;
    this.mass = mass;
    this.radius = 8 * this.mass;
    this.bounce = bounce;
    this.liftCoeff = 0;
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

class Actractor {
  constructor(x, y, mass) {
    this.position = createVector(x, y);
    this.mass = mass;
    this.G = 0.4;
  }
  display() {
    stroke(0);
    fill(175, 200);
    ellipse(this.position.x, this.position.y, this.mass * 2);
  }
  actract(mover) {
    let force = p5.Vector.sub(this.position, mover.position);
    let distance = constrain(force.mag(), 5, 25);
    force.setMag((this.G * this.mass * mover.mass) / (distance * distance));
    return force;
  }
}

let movers = [];
let actractors = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 30; i++) {
    let mass = random(0.5, 2);
    movers[i] = new Mover(random(width), random(height), mass, random(0.9));
  }
  for (let i = 0; i < 5; i++) {
    actractors[i] = new Actractor(random(width), random(height), 20);
  }
}

function draw() {
  background(0);

  movers.forEach((mover) => {
    actractors.forEach((actractor) => {
      let force = actractor.actract(mover);
      mover.applyForce(force);
    });

    mover.update();
    mover.display();
  });

  actractors.forEach((actractor) => {
    actractor.display();
  });
}

function keyReleased() {
  return false; // prevent any default behavior
}
