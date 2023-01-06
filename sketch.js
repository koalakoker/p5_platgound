class Mover {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector();
    this.acceleration = createVector();
    this.speedLimit = 10;
  }
  applyForce(force) {
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
    ellipse(this.position.x, this.position.y, 16, 16);
  }
  checkEdge() {
    if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.x > width) {
      this.position.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.y *= -1;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    }
  }
}

let movers = [];

function setup() {
  createCanvas(400, 400);
  for (let a = 0; a < 1; a++) {
    movers.push(new Mover());
  }
}

let t = 0;

function draw() {
  background(220);
  movers.forEach((mover) => {
    mover.applyForce(createVector(0, -0.1)); // Helium force
    let maxWindForce = 0.1;
    let wind = createVector(
      map(noise(t), 0, 1, -maxWindForce, maxWindForce),
      0
    );
    t += 0.1;
    mover.applyForce(wind);
    mover.update();
    mover.checkEdge();
    mover.display();
  });
}
