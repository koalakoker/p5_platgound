class Pendulum {
  constructor(parent) {
    this.r = random(80, 80);
    this.angle = random(HALF_PI);
    this.aVelocity = 0;
    this.aAcceleration = 0;
    this.origin = createVector(width / 2, 0);
    this.child = null;
    this.parent = parent;
  }
  addChild(child) {
    this.child = child;
  }
  update() {
    let g = 0.3;
    this.aAcceleration = (-1 * g * sin(this.angle)) / this.r;
    this.aVelocity += this.aAcceleration;
    this.angle += this.aVelocity;
    this.aVelocity *= 0.99;
    if (this.child) {
      this.child.update();
    }
  }
  display() {
    if (this.parent) {
      this.origin = this.parent.position;
    }

    this.position = createVector(
      this.origin.x + this.r * sin(this.angle),
      this.origin.y + this.r * cos(this.angle)
    );
    stroke(255);
    fill(255);
    line(this.origin.x, this.origin.y, this.position.x, this.position.y);
    circle(this.position.x, this.position.y, 16);
    if (this.child) {
      this.child.display();
    }
  }
}
