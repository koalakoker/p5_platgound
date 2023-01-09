class Target {
  constructor(x, y) {
    this.position = createVector(x, y);
  }
  display() {
    stroke(200, 0, 200);
    fill(255, 100);
    circle(this.position.x, this.position.y, 20);
  }
}
