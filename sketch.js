class Mover {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector();
    this.acceleration = createVector();
    this.speedLimit = 10;
  }
  update() {
    let accAmpl = 0.5;
    let target = createVector(mouseX, mouseY);
    this.acceleration = p5.Vector.sub(target, this.position);
    this.acceleration.setMag(accAmpl);

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

let movers = [];

function setup() {
  createCanvas(400, 400);
  for (let a = 0; a < 20; a++) {
    movers.push(new Mover());
  }
}

function draw() {
  background(220);
  movers.forEach((mover) => {
    mover.update();
    mover.checkEdge();
    mover.display();
  });
}
