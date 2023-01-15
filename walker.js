class Walker {
  constructor(x, y) {
    this.pos = createVector(x, y);
  }
  draw() {
    noStroke();
    fill(255);
    circle(dim / 2 + this.pos.x * dim, dim / 2 + this.pos.y * dim, dim - 4);
  }
  walk(grid) {
    this.grid = grid;
    let options = this.checkOptions(this.pos.x, this.pos.y);
    if (options.length > 0) {
      let d = random(options);
      strokeWeight(4);
      stroke(255);
      beginShape();
      vertex(dim / 2 + this.pos.x * dim, dim / 2 + this.pos.y * dim);
      this.pos.x += d.dx;
      this.pos.y += d.dy;
      vertex(dim / 2 + this.pos.x * dim, dim / 2 + this.pos.y * dim);
      endShape();
    } else {
      print("I'm stuck!");
      noLoop();
    }
  }
  isValid(i, j) {
    if (i < 0 || i >= cols || j < 0 || j >= rows) {
      return false;
    }
    return !this.grid[i][j];
  }
  checkOptions(i, j) {
    let options = [];
    if (this.isValid(i, j - 1)) {
      options.push({ dx: 0, dy: -1 });
    }
    if (this.isValid(i, j + 1)) {
      options.push({ dx: 0, dy: 1 });
    }
    if (this.isValid(i - 1, j)) {
      options.push({ dx: -1, dy: 0 });
    }
    if (this.isValid(i + 1, j)) {
      options.push({ dx: 1, dy: 0 });
    }
    return options;
  }
}
