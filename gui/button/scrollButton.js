class ScrollButton extends GElem {
  constructor(parent, x, y, w, h, direction, activationFunction) {
    super(parent, x, y, w, h, activationFunction);
    this.trMargin = 3;
    this.direction = direction;
    this.active = false;
  }
  draw() {
    if (this.active) {
      p5js.stroke(255);
      p5js.fill(255);
      p5js.rect(this.x, this.y, this.w, this.h);

      if (this.direction === "UP") {
        p5js.stroke(0);
        p5js.fill(0);
        p5js.beginShape();
        p5js.vertex(this.x + this.w / 2, this.y + this.trMargin);
        p5js.vertex(
          this.x + this.w - this.trMargin,
          this.y + this.h - this.trMargin
        );
        p5js.vertex(this.x + this.trMargin, this.y + this.h - this.trMargin);
        p5js.endShape();
      }

      if (this.direction === "DOWN") {
        p5js.stroke(0);
        p5js.fill(0);
        p5js.beginShape();
        p5js.vertex(this.x + this.w / 2, this.y + this.h - this.trMargin);
        p5js.vertex(this.x + this.w - this.trMargin, this.y + this.trMargin);
        p5js.vertex(this.x + this.trMargin, this.y + this.trMargin);
        p5js.endShape();
      }
    }
  }
}
