class FireWork {
  constructor() {
    this.mover = new Mover(random(width), height);
    this.mover.velocity = createVector(0, -random(8, 10));
    this.explode = false;
    this.particleCount = 50;
  }
  update() {
    const g = createVector(0, 0.1);
    if (!this.explode) {
      this.mover.applyForce(g);
      this.mover.update();
      this.edge();
    } else {
      for (let i = 0; i < this.particle.length; i++) {
        let mover = this.particle[i];
        const gP = createVector(0, 0.01);
        mover.applyForce(gP);
        mover.update();
      }
    }
  }
  edge() {
    if (this.mover.velocity.y >= 0) {
      this.explode = true;
      this.particle = new Array(this.particleCount);
      for (let i = 0; i < this.particle.length; i++) {
        this.particle[i] = new Mover(
          this.mover.position.x,
          this.mover.position.y
        );
        let v = p5.Vector.random2D();
        v.setMag(random(1));
        this.particle[i].velocity = v;
      }
    }
  }
  display() {
    if (!this.explode) {
      this.mover.display();
    } else {
      for (let i = 0; i < this.particle.length; i++) {
        let mover = this.particle[i];
        mover.display();
      }
    }
  }
}
