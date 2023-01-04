class Mover {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-2, 2), random(-2, 2));
  }
  update() {
    this.position.add(this.velocity);
  }
  display() {
    stroke(0);
    fill(175);
    ellipse(this.position.x, this.position.y, 16, 16);
  }
  checkEdge() {
    if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.x > width) {
      this.position.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = height;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    }
  }
}

let mover;

function setup() {
  createCanvas(400, 400);
  mover = new Mover();
}

function draw() {
  background(220);
  mover.update();
  mover.checkEdge();
  mover.display();
}
