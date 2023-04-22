class WndButton extends GElem {
  constructor(parent, x, y, w, h, type, activationFunction) {
    super(parent, x, y, w, h, activationFunction);
    this.trMargin = 3;
    this.type = type;
    this.active = true;
  }
  draw() {
    if (this.active) {
      p5js.stroke(180);
      p5js.fill(180);
      p5js.rect(this.x, this.y, this.w, this.h);
      p5js.stroke(255);
      p5js.line(this.x, this.y, this.x + this.w, this.y);
      p5js.line(this.x, this.y, this.x, this.y + this.h);
      p5js.stroke(100);
      p5js.line(this.x, this.y + this.h, this.x + this.w, this.y + this.h);
      p5js.line(this.x + this.w, this.y, this.x + this.w, this.y + this.h);

      if (this.type === "UP") {
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

      if (this.type === "DOWN") {
        p5js.stroke(0);
        p5js.fill(0);
        p5js.beginShape();
        p5js.vertex(this.x + this.w / 2, this.y + this.h - this.trMargin);
        p5js.vertex(this.x + this.w - this.trMargin, this.y + this.trMargin);
        p5js.vertex(this.x + this.trMargin, this.y + this.trMargin);
        p5js.endShape();
      }

      if (this.type === "CLOSE") {
        p5js.stroke(0);
        p5js.fill(0);
        p5js.line(
          this.x + this.trMargin,
          this.y + this.trMargin,
          this.x + this.w - this.trMargin,
          this.y + this.h - this.trMargin
        );
        p5js.line(
          this.x + this.trMargin,
          this.y + this.h - this.trMargin,
          this.x + this.w - this.trMargin,
          this.y + this.trMargin
        );
      }

      if (this.type === "EDIT") {
        p5js.stroke(0);
        p5js.fill(0);
        p5js.line(
          this.x + this.trMargin,
          this.y + this.trMargin,
          this.x + this.w - this.trMargin,
          this.y + this.trMargin
        );
        p5js.line(
          this.x + this.trMargin,
          this.y + this.h - this.trMargin,
          this.x + this.w - this.trMargin,
          this.y + this.h - this.trMargin
        );
        p5js.line(
          this.x + this.w / 2,
          this.y + this.trMargin,
          this.x + this.w / 2,
          this.y + this.h - this.trMargin
        );
      }

      if (this.type === "YES") {
        p5js.textSize(this.textSize);
        p5js.textAlign(p5js.CENTER, p5js.CENTER);
        p5js.stroke(0);
        p5js.fill(0);
        p5js.text("Yes", this.x + this.w / 2, this.y + this.h / 2);
      }

      if (this.type === "NO") {
        p5js.textSize(this.textSize);
        p5js.textAlign(p5js.CENTER, p5js.CENTER);
        p5js.stroke(0);
        p5js.fill(0);
        p5js.text("No", this.x + this.w / 2, this.y + this.h / 2);
      }
    }
  }
}
