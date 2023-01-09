class Rocket {
  constructor(dna) {
    this.position = createVector(width / 2, height - 100);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.speedLimit = 10;
    if (dna) {
      this.dna = dna;
    } else {
      this.dna = new DNA();
    }
    this.age = 0;
    this.live = true;
    rectMode(CENTER);
  }
  applyForce(force) {
    this.acceleration.add(force);
  }
  update() {
    this.applyForce(this.dna.genes[this.age]);
    this.age++;
    if (this.age >= this.dna.lifeSpan) {
      this.live = false;
    }

    if (this.live) {
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.speedLimit);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  }
  display() {
    noStroke();
    fill(255, 100);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    rect(0, 0, 50, 10);
    pop();
  }
  checkEdge() {
    if (
      this.position.x < 0 ||
      this.position.x > width ||
      this.position.y < 0 ||
      this.position.y > height
    ) {
      this.live = false;
    }
  }
}
