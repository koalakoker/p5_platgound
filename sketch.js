let roket;

function setup() {
  createCanvas(600, 600);
  roket = new Rocket(width / 2, height - 100);
}

function draw() {
  background(0);

  roket.update();
  roket.checkEdge();
  roket.display();
}
