let newID = 0;

class Element {
  constructor() {
    this.id = newID;
    newID++;
    this.style = new Style(drawing.newElementStyle);
  }
  draw() {}
  setStyle() {
    this.style.set();
  }
}
