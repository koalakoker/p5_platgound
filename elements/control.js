class Control {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    stroke(255); // Manage selecttion
    strokeWeight(10);
    point(this.x, this.y);
  }
}
