class Mover {
  constructor(x, y) {
    this.position = createVector(x, y);
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
    noStroke();
    fill(255);
    circle(this.position.x, this.position.y, 5, 5);
  }
  actraction(actractor) {
    let force = p5.Vector.sub(actractor, this.position);
    let g = 1;
    let d = force.mag();
    d = constrain(d, 0.1, 50);
    force.mult(g / (d * d));
    if (d < 20) {
      force.mult(-10);
    }

    this.applyForce(force);
  }
}
