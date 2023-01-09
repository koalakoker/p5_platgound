class Population {
  constructor() {
    this.populationLength = 30;
    this.rockets = new Array(this.populationLength);
    for (let i = 0; i < this.rockets.length; i++) {
      this.rockets[i] = new Rocket();
    }
  }
  run(obstacle) {
    for (let i = 0; i < this.rockets.length; i++) {
      const rocket = this.rockets[i];
      rocket.update();
      rocket.checkEdge();
      rocket.checkObstacle(obstacle);
      rocket.display();
    }
  }
  endOfGeneration() {
    let active = 0;
    for (let i = 0; i < this.rockets.length; i++) {
      if (this.rockets[i].live) {
        active++;
      }
    }
    return active === 0;
  }
  evaluate(target) {
    let maxFit = 0;
    for (let i = 0; i < this.rockets.length; i++) {
      const rocket = this.rockets[i];
      let d = dist(
        rocket.position.x,
        rocket.position.y,
        target.position.x,
        target.position.y
      );
      d = constrain(d, 1, 2000);
      rocket.fitness = 1 / d;
      if (rocket.killed) {
        rocket.fitness /= 10;
      }
      if (rocket.fitness > maxFit) {
        maxFit = rocket.fitness;
      }
    }
    for (let i = 0; i < this.rockets.length; i++) {
      const rocket = this.rockets[i];
      rocket.fitness /= maxFit;
    }
    this.matingpool = [];
    for (let i = 0; i < this.rockets.length; i++) {
      let n = this.rockets[i].fitness * 100;
      for (let j = 0; j < n; j++) {
        this.matingpool.push(this.rockets[i]);
      }
    }
  }
  selection() {
    let newPopulation = [];
    for (let i = 0; i < this.rockets.length; i++) {
      let parentA = random(this.matingpool).dna;
      let parentB = random(this.matingpool).dna;
      let child = parentA.crossover(parentB);
      child.mutation();
      newPopulation[i] = new Rocket(child);
    }
    this.rockets = newPopulation;
  }
}
