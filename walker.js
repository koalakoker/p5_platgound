class Walker {
  constructor(x, y) {
    this.pos = createVector(x, y);
  }
  draw() {
    noStroke();
    fill(255);
    circle(this.pos.x * dim, this.pos.y * dim, dim - 4);
  }
  walk(grid) {
    let options = this.checkOptions(grid, this.pos.x, this.pos.y);
    if (options.length > 0) {
      let d = random(options);
      strokeWeight(4);
      stroke(255);
      beginShape();
      vertex(this.pos.x * dim, this.pos.y * dim);
      this.pos.x += d.dx;
      this.pos.y += d.dy;
      vertex(this.pos.x * dim, this.pos.y * dim);
      endShape();
    } else {
      print("I'm stuck!");
      noLoop();
    }
  }
  checkOptions(grid, i, j) {
    let options = [];
    if (!grid[i][j - 1]) {
      options.push({ dx: 0, dy: -1 });
    }
    if (!grid[i][j + 1]) {
      options.push({ dx: 0, dy: 1 });
    }
    if (!grid[i - 1][j]) {
      options.push({ dx: -1, dy: 0 });
    }
    if (!grid[i + 1][j]) {
      options.push({ dx: 1, dy: 0 });
    }
    return options;
  }
}
