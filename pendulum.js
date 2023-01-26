class Pendulum {
  constructor() {
    this.r = 200;
    this.angle = 45;
    this.aVelocity = 0;
    this.aAcceleration = 0;
  }
  update() {
    let g = 0.3;
    this.aAcceleration = (-1 * g * sin(this.angle)) / this.r;
    this.aVelocity += this.aAcceleration;
    this.angle += this.aVelocity;
  }
  display() {
    let position = createVector(
      this.r * sin(this.angle),
      this.r * cos(this.angle)
    );
    translate(width / 2, height / 2);
    circle(position.x, position.y, 16);
  }
}
