class FireWork {
  constructor() {
    this.mover = new Mover(random(width), height);
    this.mover.velocity = createVector(0, -random(8, 10));
  }
  update() {
    const g = createVector(0, 0.1);
    this.mover.applyForce(g);
    this.mover.update();
    this.edge();
  }
  edge() {}
  display() {
    this.mover.display();
  }
}
