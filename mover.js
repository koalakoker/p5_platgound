class Mover {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.speedLimit = 10;
  }
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.speedLimit);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  display() {
    noStroke();
    fill(255);
    circle(this.position.x, this.position.y, 5, 5);
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
