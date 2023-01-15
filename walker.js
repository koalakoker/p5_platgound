class Walker {
  constructor(x, y) {
    this.pos = createVector(x, y);
  }
  draw() {
    fill(255, 255, 255, 50);
    circle(this.pos.x * dim, this.pos.y * dim, dim);
  }
  walk() {
    let d = floor(random(4));
    if (d === 0) {
      this.pos.y -= 1;
    } else if (d === 1) {
      this.pos.x -= 1;
    } else if (d === 2) {
      this.pos.y += 1;
    } else if (d === 3) {
      this.pos.x += 1;
    }
  }
}
