let population;

function setup() {
  createCanvas(600, 600);
  population = new Population();
}

function draw() {
  background(0);
  if (!population.endOfGeneration()) {
    population.run();
  } else {
    population = new Population();
  }
}
