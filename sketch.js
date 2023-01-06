class Mover {
  constructor(x, y, m) {
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.speedLimit = 10;
    this.mass = m;
    this.radius = 8 * this.mass;
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
  repellingEdge() {
    if (this.position.y > height - this.radius) {
      this.applyForce(createVector(0, -1));
    }
    if (this.position.y < this.radius) {
      this.applyForce(createVector(0, 1));
    }
    if (this.position.x > width - this.radius) {
      this.applyForce(createVector(-1, 0));
    }
    if (this.position.x < this.radius) {
      this.applyForce(createVector(1, 0));
    }
  }
  checkEdge() {
    if (this.position.x < this.radius) {
      this.position.x = this.radius;
      this.velocity.x *= -1;
    }
    if (this.position.x > width - this.radius) {
      this.position.x = width - this.radius;
      this.velocity.x *= -1;
    }
    if (this.position.y < this.radius) {
      this.position.y = this.radius;
      this.velocity.y *= -1;
    }
    if (this.position.y > height - this.radius) {
      this.position.y = height - this.radius;
      this.velocity.y *= -1;
    }
  }
}

let movers = [];

function setup() {
  createCanvas(400, 400);
  for (let a = 0; a < 5; a++) {
    movers.push(new Mover(random(width), random(height), random(10)));
  }
}

let t = 0;

function draw() {
  background(220);
  movers.forEach((mover) => {
    let gravity = createVector(0, 0.1);
    mover.applyForce(gravity);

    if (mouseIsPressed) {
      let wind = createVector(0.1, 0);
      mover.applyForce(wind);
    }

    mover.repellingEdge();
    //mover.checkEdge();
    mover.update();
    mover.display();
  });
}
