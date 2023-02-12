class Bar extends GElem {
  constructor(parent, x, y) {
    super(parent, x, y);
    this.margin = 3;
    this.elements = [];
    this.width = 0;
  }
  preload() {
    this.elements.forEach((element) => {
      element.preload();
    });
  }
  append(element) {
    element.x = this.width;
    this.width += element.size().w + this.margin;
    this.elements.push(element);
  }
  display() {
    this.elements.forEach((element) => {
      element.display();
    });
  }
  size() {
    return {
      w: this.width,
      h: GElem.side(),
    };
  }
  inside() {
    return Rect.inside(
      mouseX,
      mouseY,
      this.getX(),
      this.getY(),
      this.size().w,
      this.size().h
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
