class Style {
  constructor(style) {
    if (!style) {
      this.fill = true;
      this.fillColor = color(0, 0, 0, 255);
      this.stroke = true;
      this.strokeColor = color(255, 255, 255, 255);
      this.strokeWeight = 1;
    } else {
      this.fill = style.fill;
      this.fillColor = style.fillColor;
      this.stroke = style.stroke;
      this.strokeColor = style.strokeColor;
      this.strokeWeight = style.strokeWeight;
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
      strokeWeight(this.strokeWeight);
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
      strokeWeight: this.strokeWeight,
    });
  }
  deserialize(jsonStr) {
    const element = JSON.parse(jsonStr);
    this.fill = element.fill;
    this.fillColor = color(
      element.fillColor.r,
      element.fillColor.g,
      element.fillColor.b
    );
    this.stroke = element.stroke;
    this.strokeColor = color(
      element.strokeColor.r,
      element.strokeColor.g,
      element.strokeColor.b
    );
    this.strokeWeight = element.strokeWeight;
  }
}
