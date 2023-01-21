let movers = [];
let actractor;

function setup() {
  createCanvas(400, 400);

  actractor = new createVector(200, 200);

  movers = new Array(20);
  for (let i = 0; i < movers.length; i++) {
    movers[i] = new Mover(random(width), random(height));
    //movers[i].velocity = createVector();
  }
}

function draw() {
  background(0);

  stroke(0, 255, 0);
  strokeWeight(4);
  point(actractor.x, actractor.y);

  for (let i = 0; i < movers.length; i++) {
    mover = movers[i];
    mover.actraction(actractor);
    mover.update();
    mover.display();
  }
}
