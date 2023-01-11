class Ball {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.speedLimit = 10;
    this.r = 5;
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
    circle(this.position.x, this.position.y, this.r * 2);
  }
  checkEdge() {
    if (this.position.x < 0) {
      this.position.x = 0;
      this.velocity.x *= -1;
    }
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    }
    if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.y *= -1;
    }
    if (this.position.y > height) {
      this.position.y = height;
      this.velocity.x = 0;
      this.velocity.y = 0;
    }
  }
  collideWithBar(bar) {
    if (bar.inside(this.position, this.r)) {
      this.velocity.y *= -1;
    }
  }
}
