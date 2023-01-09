class DNA {
  constructor(genes) {
    if (!genes) {
      this.lifeSpan = 400;
      this.maxTrust = 0.1;
      this.genes = new Array(this.lifeSpan);
      for (let i = 0; i < this.genes.length; i++) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(this.maxTrust);
      }
    }
  }
}
