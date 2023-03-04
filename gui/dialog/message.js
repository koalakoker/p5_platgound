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
    stroke(0, this.alpha);
    fill(0, this.alpha);
    rectMode(CENTER);
    rect(this.x, this.y, textWidth(this.text) + this.margin, 16 + this.margin);
    rectMode(CORNER);
    textSize(16);
    textAlign(CENTER, CENTER);

    const textFillColor = color(
      red(this.color),
      green(this.color),
      blue(this.color),
      this.alpha
    );
    stroke(textFillColor);
    fill(textFillColor);
    text(this.text, this.x, this.y);
  }
}
