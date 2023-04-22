class CloseWndButton extends WndButton {
  constructor(parent, x, y, w, h, activationFunction) {
    super(parent, x, y, w, h, activationFunction);
  }
  draw() {
    super.draw();
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
}
