class Mover {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.speedLimit = 10;
  }
  update() {
    this.acceleration = p5.Vector.random2D();
    this.acceleration.mult(random(2));
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.speedLimit);
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
