class DNA {
  constructor(genes) {
    if (!genes) {
      this.lifeSpan = floor(random(200, 400));
      let maxTrust = 0.1;
      this.genes = new Array(this.lifeSpan);
      for (let i = 0; i < this.genes.length; i++) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxTrust);
      }
    } else {
      this.genes = genes;
      this.lifeSpan = this.genes.length;
    }
  }
}
