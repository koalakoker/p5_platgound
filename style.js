class Style {
  constructor(style) {
    if (!style) {
      this.fill = false;
      this.fillColor = color(255, 255, 255, 255);
      this.stroke = true;
      this.strokeColor = color(255, 255, 255, 255);
    } else {
      this.fill = style.fill;
      this.fillColor = style.fillColor;
      this.stroke = style.stroke;
      this.strokeColor = style.strokeColor;
    }
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
