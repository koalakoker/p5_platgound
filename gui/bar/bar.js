class Bar extends GElem {
  constructor(x, y) {
    super(x, y);
    this.margin = 3;
    this.elements = [];
    this.xPos = this.x;
  }
  preload() {
    this.elements.forEach((element) => {
      element.preload();
    });
  }
  updateChildren() {
    this.xPos = this.x;
    this.elements.forEach((element) => {
      element.x = this.xPos;
      element.y = this.y;
      this.xPos += element.size().x + this.margin;
    });
  }
  append(element) {
    element.x = this.xPos;
    element.y = this.y;
    element.updateChildren();
    this.elements.push(element);
    this.xPos += element.size().x + this.margin;
  }
  display() {
    this.elements.forEach((element) => {
      element.display();
    });
  }
  size() {
    return { x: this.xPos - this.x, y: GElem.side() };
  }
  inside() {
    return Rect.inside(
      mouseX,
      mouseY,
      this.x,
      this.y,
      this.size().x,
      this.size().y
    );
  }
  mouseMoved() {
    this.elements.forEach((element) => {
      element.mouseMoved();
    });
  }
  mouseDragged() {
    this.elements.forEach((element) => {
      element.mouseDragged();
    });
  }
  mousePressed() {
    for (let i = 0; i < this.elements.length; i++) {
      const element = this.elements[i];
      if (element.mousePressed() === true) {
        return true;
      }
    }
    return false;
  }
  mouseReleased() {
    this.elements.forEach((element) => {
      element.mouseReleased();
    });
  }
  keyPressed() {
    this.elements.forEach((element) => {
      element.keyPressed();
    });
  }
}
