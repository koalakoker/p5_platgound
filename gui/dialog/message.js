class Message extends Dialog {
  constructor(x, y, text, duration, cbEnd, fadeIn, fadeOut) {
    super(x, y);
    this.text = text;
    this.endLife = millis() + duration;
    this.cbEnd = cbEnd;
    this.margin = 20;
    this.alpha = 0;
    // this.start = millis();
    // this.fadeIn = fadeIn;
    // this.fadeOut = fadeOut;
    // this.duration = duration;

    // p5.tween.manager
    //   .addTween(this)
    //   .addMotion('alpha', 255, fadeIn, "easeInOutQuint")
    //   .start();
  }
  draw() {
    stroke(0);
    fill(0);
    rectMode(CENTER);
    rect(this.x, this.y, textWidth(this.text) + this.margin, 16 + this.margin);
    rectMode(CORNER);
    textSize(16);
    textAlign(CENTER, CENTER);
    stroke(255, this.alpha);
    fill(255, this.alpha);
    text(this.text, this.x, this.y);
    // let time = this.start - millis();
    // this.alpha = map(time, 0, this.fadeIn, 0, 255);

    // if (millis() >= this.endLife) {
    //   this.alpha = map(
    //     time,
    //     this.duration,
    //     this.duration + this.fadeOut,
    //     255,
    //     0
    //   );
    //   if (this.alpha === 0) {
    //     if (this.cbEnd) {
    //       this.cbEnd(this);
    //     }
    //   }
    //}
  }
}
