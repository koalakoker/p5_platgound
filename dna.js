class DNA {
  constructor(genes) {
    if (!genes) {
      this.lifeSpan = 300; //floor(random(200, 400));
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
  crossover(parent) {
    let childGenes = [];
    for (let i = 0; i < this.genes.length; i++) {
      let p = floor(random(2));
      if (p == 0) {
        childGenes[i] = this.genes[i];
      } else {
        childGenes[i] = parent.genes[i];
      }
    }
    return new DNA(childGenes);
  }
}
