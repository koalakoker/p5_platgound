class Box {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.side = 40;
    this.angle = angle;
  }
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(255);
    noStroke();
    rect(0, -this.side, this.side);
    pop();
  }
}
