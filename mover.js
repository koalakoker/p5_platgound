class Mover {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.speedLimit = 10;

    this.angle = 0;
    this.radius = 16;
  }
  applyForce(force) {
    this.acceleration.add(force);
  }
  update() {
    this.aAcceleration = this.acceleration.x / 10;

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.speedLimit);
    this.angle = this.velocity.heading();
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  display() {
    stroke(0);
    fill(255);

    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    circle(0, 0, 2 * this.radius);
    line(0, 0, this.radius, 0);
    pop();
  }
  checkEdge() {
    let r = this.radius;
    if (this.position.x - r < 0) {
      this.position.x = width - r;
    }
    if (this.position.x + r > width) {
      this.position.x = r;
    }
    if (this.position.y - r < 0) {
      this.position.y = height - r;
    }
    if (this.position.y + r > height) {
      this.position.y = r;
    }
  }
}
