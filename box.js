class DynoBox {
  constructor(x, y, angle) {
    this.position = createVector(x, y);
    this.speed = createVector();
    this.acceletarion = createVector();
    this.side = 40;
    this.angle = angle;
    this.mass = 50;
    this.frictionCoeff = 0.5;
  }
  display() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    fill(255);
    noStroke();
    rect(0, -this.side, this.side);
    stroke(255, 0, 0);
    line(0, 0, this.ft, 0);
    stroke(0, 0, 255);
    line(0, 0, 0, this.fn);
    pop();
    stroke(0, 255, 0);
    line(
      this.position.x,
      this.position.y,
      this.position.x,
      this.position.y + this.g
    );
  }
  update() {
    this.forceSplit();
    let resultantForce = (this.ft - this.frictionCoeff * this.fn) / this.mass;
    resultantForce = resultantForce < 0 ? 0 : resultantForce;
    let force = createVector(resultantForce, 0);
    force.rotate(this.angle);
    this.applyForce(force);

    this.speed.add(this.acceletarion);
    this.position.add(this.speed);
    this.acceletarion.mult(0);
  }

  forceSplit() {
    this.g = this.mass;
    this.ft = this.g * sin(this.angle);
    this.fn = this.g * cos(this.angle);
  }

  applyForce(force) {
    this.acceletarion.add(force);
  }
}
