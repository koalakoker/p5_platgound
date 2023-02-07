class Element {
  constructor() {
    this.id = 0;
    this.style = new Style(drawing.newElementStyle);
  }
  draw() {}
  setStyle() {
    this.style.set();
  }
  serialize() {
    return {
      id: this.id,
      style: JSON.parse(this.style.serialize()),
    };
  }
}
