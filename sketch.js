let population;

function setup() {
  createCanvas(600, 600);
  population = new Population();
}

function draw() {
  background(0);
  population.run();
}
