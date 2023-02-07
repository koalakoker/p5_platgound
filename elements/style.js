class Style {
  constructor(style) {
    if (!style) {
      this.fill = true;
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
  static serializeColor(color) {
    return JSON.stringify({
      r: red(color),
      g: green(color),
      b: blue(color),
    });
  }
  serialize() {
    return JSON.stringify({
      fill: this.fill,
      fillColor: JSON.parse(Style.serializeColor(this.fillColor)),
      stroke: this.stroke,
      strokeColor: JSON.parse(Style.serializeColor(this.strokeColor)),
    });
  }
  deserialize() {}
}
