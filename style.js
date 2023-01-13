class Style {
  constructor() {
    this.fill = false;
    this.fillColor = color(255, 255, 255, 255);
    this.stroke = true;
    this.strokeColor = color(255, 255, 255, 255);
  }
  set() {
    if (this.fill) {
      fill(this.fillColor);
    } else {
      noFill();
    }
    if (this.stroke) {
      stroke(this.strokeColor);
    } else {
      noStroke();
    }
  }
}
