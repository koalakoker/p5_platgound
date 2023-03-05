class Style {
  constructor(style) {
    if (!style) {
      this.fill = true;
      this.fillColor = p5js.color(0, 0, 0, 255);
      this.stroke = true;
      this.strokeColor = p5js.color(255, 255, 255, 255);
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
      p5js.fill(this.fillColor);
    } else {
      p5js.noFill();
    }
    if (this.stroke) {
      p5js.stroke(this.strokeColor);
      p5js.strokeWeight(this.strokeWeight);
    } else {
      p5js.noStroke();
    }
  }
  static serializeColor(color) {
    return JSON.stringify({
      r: p5js.red(color),
      g: p5js.green(color),
      b: p5js.blue(color),
      a: p5js.alpha(color),
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
    this.fillColor = p5js.color(
      element.fillColor.r,
      element.fillColor.g,
      element.fillColor.b,
      element.fillColor.a
    );
    this.stroke = element.stroke;
    this.strokeColor = p5js.color(
      element.strokeColor.r,
      element.strokeColor.g,
      element.strokeColor.b,
      element.strokeColor.a
    );
    this.strokeWeight = element.strokeWeight;
  }
}
