class Message extends Dialog {
  constructor(x, y, text, duration, cbEnd) {
    super(x, y);
    this.text = text;
    this.endLife = millis() + duration;

    this.cbEnd = cbEnd;
    this.margin = 20;
  }
  draw() {
    stroke(0);
    fill(0);
    rectMode(CENTER);
    rect(this.x, this.y, textWidth(this.text) + this.margin, 16 + this.margin);
    rectMode(CORNER);
    textSize(16);
    textAlign(CENTER, CENTER);
    stroke(255);
    fill(255);
    text(this.text, this.x, this.y);
    if (millis() >= this.endLife) {
      if (this.cbEnd) {
        this.cbEnd(this);
      }
    }
  }
}
