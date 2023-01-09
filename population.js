class Population {
  constructor() {
    this.populationLength = 30;
    this.rockets = new Array(this.populationLength);
    for (let i = 0; i < this.rockets.length; i++) {
      this.rockets[i] = new Rocket(width / 2, height - 100);
    }
  }
  run() {
    for (let i = 0; i < this.rockets.length; i++) {
      const rocket = this.rockets[i];
      rocket.update();
      rocket.checkEdge();
      rocket.display();

      for (let i = this.rockets.length - 1; i >= 0; i--) {
        const rocket = this.rockets[i];
        if (!rocket.live) {
          this.rockets.splice(i, 1);
        }
      }
    }
  }
  endOfGeneration() {
    return this.rockets.length === 0;
  }
}
