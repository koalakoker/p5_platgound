class Mover {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.speedLimit = 10;

    this.angle = 0;
    this.aVelocity = 0;
    this.aAcceleration = 0;

    this.radius = 16;
  }
  applyForce(force) {
    this.acceleration.add(force);
  }
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.speedLimit);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    this.aVelocity += this.aAcceleration;
    this.angle += this.aVelocity;
    this.aAcceleration = 0;
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
    if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.x > width) {
      this.position.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = height;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    }
  }
}
