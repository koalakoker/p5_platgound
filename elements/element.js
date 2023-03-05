class Element {
  constructor() {
    this.id = 0;
    this.style = new Style();
    this.selected = false;
    this.controls = [];
  }
  addStyle(style) {
    this.style = style;
    return this;
  }
  draw() {
    this.setStyle();
    if (this.selected) {
      p5js.strokeWeight(this.style.strokeWeight + 1);
      p5js.stroke(255, 255, 0);
    }
  }
  showControls() {
    this.controls.forEach((control) => {
      control.draw();
    });
  }
  inside() {
    return false;
  }
  setStyle() {
    this.style.set();
  }
  serialize() {
    return {
      id: this.id,
      style: JSON.parse(this.style.serialize()),
    };
  }
  static deserialize(jsonString) {
    const element = JSON.parse(jsonString);
    let obj;
    if (element.id === 1) {
      obj = new Line(element.x1, element.y1, element.x2, element.y2);
    }
    if (element.id === 2) {
      obj = new Circle(element.x, element.y, element.r);
    }
    if (element.id === 3) {
      obj = new Rectangle(element.x1, element.y1, element.x2, element.y2);
    }
    obj.style.deserialize(JSON.stringify(element.style));
    return obj;
  }
}
