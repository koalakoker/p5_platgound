class WndButton extends GElem {
  constructor(parent, x, y, w, h, activationFunction) {
    super(parent, x, y, w, h, activationFunction);
    this.trMargin = 3;
    this.active = true;
    this.color = p5js.color(180);
  }

  draw() {
    if (this.active) {
      p5js.stroke(this.color);
      p5js.fill(this.color);
      p5js.rect(this.x, this.y, this.w, this.h);
      p5js.stroke(255);
      p5js.line(this.x, this.y, this.x + this.w, this.y);
      p5js.line(this.x, this.y, this.x, this.y + this.h);
      p5js.stroke(100);
      p5js.line(this.x, this.y + this.h, this.x + this.w, this.y + this.h);
      p5js.line(this.x + this.w, this.y, this.x + this.w, this.y + this.h);
    }
  }

  mousePressed(x, y) {
    this.color = p5js.color(200);
    this.debouncePromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
  }
  mouseReleased(x, y) {
    this.color = p5js.color(180);
  }

  debounce() {
    return this.debouncePromise;
  }
}
