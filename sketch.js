function setup() {
  createCanvas(600, 600);
  population = new Population();
  population.target = new Target(width / 2, 50);
  population.obstacle = new Obstacle(width / 2, height / 2, 200, 50);
}

function draw() {
  background(0);
  if (!population.endOfGeneration()) {
    population.run();
  } else {
    population.evaluate();
    population.selection();
  }
  population.target.display();
  population.obstacle.display();
}
