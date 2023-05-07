class TextWndButton extends WndButton {
  constructor(parent, txt, x, y, w, h, activationFunction) {
    super(parent, x, y, w, h, activationFunction);
    this.txt = txt;
  }
  draw() {
    super.draw();
    p5js.textSize(this.textSize);
    p5js.textAlign(p5js.CENTER, p5js.CENTER);
    p5js.stroke(0);
    p5js.fill(0);
    p5js.text(this.txt, this.x + this.w / 2, this.y + this.h / 2);
  }
}
