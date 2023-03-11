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
  element(index) {
    if (index < 0 || index >= this.elements.length) {
      return;
    }
    return this.elements[index];
  }
  size() {
    return {
      w: this.width,
      h: GElem.side(),
    };
  }
  inside(x, y) {
    return Rect.inside(
      x,
      y,
      this.getX(),
      this.getY(),
      this.size().w,
      this.size().h
    );
  }
  mouseMoved(x, y) {
    this.elements.forEach((element) => {
      element.mouseMoved(x, y);
    });
  }
  mouseDragged(x, y) {
    this.elements.forEach((element) => {
      element.mouseDragged(x, y);
    });
  }
  mousePressed(x, y) {
    for (let i = 0; i < this.elements.length; i++) {
      const element = this.elements[i];
      if (element.mousePressed(x, y) === true) {
        return true;
      }
    }
    return false;
  }
  mouseReleased(x, y) {
    this.elements.forEach((element) => {
      element.mouseReleased(x, y);
    });
  }
}
