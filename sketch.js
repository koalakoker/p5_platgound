function setup() {
  createCanvas(600, 600);
  population = new Population();
  target = new Target(width / 2, 50);
}

function draw() {
  background(0);
  if (!population.endOfGeneration()) {
    population.run();
  } else {
    population.evaluate(target);
    population.selection();
  }
  target.display();
}
