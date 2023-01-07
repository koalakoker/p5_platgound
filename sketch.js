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
    fill(175);
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

function setup() {
  createCanvas(400, 400);
  for (let a = 0; a < 50; a++) {
    movers.push(
      new Mover(random(width), random(height), random(5), random(0.9))
    );
  }
}

let t = 0;

function draw() {
  background(220);
  movers.forEach((mover) => {
    let gravity = createVector(0, 0.1 * mover.mass);
    mover.applyForce(gravity);

    if (mouseIsPressed) {
      let mouse = createVector(mouseX, mouseY);
      let wind = p5.Vector.sub(mover.position, mouse);
      wind.setMag(0.5);
      mover.applyForce(wind);
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
