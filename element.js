let newID = 0;

class Element {
  constructor() {
    this.id = newID;
    newID++;
    this.style = new Style(newElementStyle);
  }
  draw() {}
  setStyle() {
    this.style.set();
  }
}
