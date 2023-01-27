class Pendulum {
  constructor() {
    this.r = 300;
    this.angle = 0;
    this.aVelocity = 0;
    this.aAcceleration = 0;
    this.origin = createVector(width / 2, 0);
  }
  update() {
    let g = 0.3;
    this.aAcceleration = (-1 * g * sin(this.angle)) / this.r;
    this.aVelocity += this.aAcceleration;
    this.angle += this.aVelocity;
    this.aVelocity *= 0.99;
  }
  display() {
    let position = createVector(
      this.origin.x + this.r * sin(this.angle),
      this.origin.y + this.r * cos(this.angle)
    );
    stroke(255);
    fill(255);
    line(this.origin.x, this.origin.y, position.x, position.y);
    circle(position.x, position.y, 16);
  }
}
