class Mover {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.prevPosition = [];
    this.trayLen = 10;
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
    stroke(255);
    strokeWeight(4);
    beginShape();
    vertex(this.position.x, this.position.y);
    for (let i = this.prevPosition.length - 1; i >= 0; i--) {
      vertex(this.prevPosition[i].x, this.prevPosition[i].y);
    }
    endShape();
    let newElement = createVector(this.position.x, this.position.y);
    this.prevPosition.push(newElement);
    if (this.prevPosition.length > this.trayLen) {
      this.prevPosition.shift();
    }
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
