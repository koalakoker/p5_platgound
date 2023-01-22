let movers = [];
let actractors = [];

function setup() {
  createCanvas(800, 600);
}

function mousePressed() {
  actractors.push(createVector(mouseX, mouseY));
}

function draw() {
  background(0);

  if (random(1) < 0.1) {
    let mover = new Mover(random(width), random(height));
    mover.velocity = createVector(random(-2, 2), random(-2, 2));
    movers.push(mover);
    if (movers.length > 30) {
      movers.shift();
    }
  }

  stroke(0, 255, 0);
  strokeWeight(4);
  for (let i = 0; i < actractors.length; i++) {
    point(actractors[i].x, actractors[i].y);
  }

  for (let i = 0; i < movers.length; i++) {
    mover = movers[i];
    for (let i = 0; i < actractors.length; i++) {
      mover.actraction(actractors[i]);
    }
    mover.update();
    mover.display();
  }
}
