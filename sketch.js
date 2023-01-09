function setup() {
  createCanvas(600, 600);
  population = new Population();
  target = new Target(width / 2, 50);
  obstacle = new Obstacle(width / 2, height / 2, 200, 50);
}

function draw() {
  background(0);
  if (!population.endOfGeneration()) {
    population.run(obstacle);
  } else {
    population.evaluate(target);
    population.selection();
  }
  target.display();
  obstacle.display();
}
