class Message extends Dialog {
  constructor(text, duration, cbEnd, fadeIn, fadeOut) {
    super();
    this.text = text;
    this.endLife = millis() + duration;
    this.cbEnd = cbEnd;
    this.margin = 20;
    this.alpha = 0;

    p5.tween.manager
      .addTween(this)
      .addMotion("alpha", 255, fadeIn, "easeInQuad")
      .addMotion("alpha", 255, duration)
      .addMotion("alpha", 0, fadeOut, "easeOutQuad")
      .onEnd(() => {
        if (this.cbEnd) {
          this.cbEnd(this);
        }
      })
      .startTween();
  }
  draw() {
    stroke(0, this.alpha);
    fill(0, this.alpha);
    rectMode(CENTER);
    rect(this.x, this.y, textWidth(this.text) + this.margin, 16 + this.margin);
    rectMode(CORNER);
    textSize(16);
    textAlign(CENTER, CENTER);
    stroke(255, this.alpha);
    fill(255, this.alpha);
    text(this.text, this.x, this.y);
  }
}
