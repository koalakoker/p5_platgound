class Message extends Dialog {
  constructor(text, duration, color, cbEnd, fadeIn, fadeOut) {
    super();
    this.text = text;
    this.cbEnd = cbEnd;
    this.margin = 20;
    this.color = color;
    this.alpha = 0;
    this.started = false;

    this.tween = p5.tween.manager
      .addTween(this)
      .addMotion("alpha", 255, fadeIn, "easeInQuad")
      .addMotion("alpha", 255, duration)
      .addMotion("alpha", 0, fadeOut, "easeOutQuad")
      .onEnd(() => {
        if (this.cbEnd) {
          this.cbEnd(this);
        }
      });
  }
  show() {
    this.tween.startTween();
    this.started = true;
  }
  notStarted() {
    return !this.started;
  }
  draw() {
    p5js.stroke(0, this.alpha);
    p5js.fill(0, this.alpha);
    p5js.rectMode(p5js.CENTER);
    p5js.rect(
      this.x,
      this.y,
      p5js.textWidth(this.text) + this.margin,
      16 + this.margin
    );
    p5js.rectMode(p5js.CORNER);
    p5js.textSize(16);
    p5js.textAlign(p5js.CENTER, p5js.CENTER);

    const textFillColor = p5js.color(
      p5js.red(this.color),
      p5js.green(this.color),
      p5js.blue(this.color),
      this.alpha
    );
    p5js.stroke(textFillColor);
    p5js.fill(textFillColor);
    p5js.text(this.text, this.x, this.y);
  }
}
