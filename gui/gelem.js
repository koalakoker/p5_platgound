class GElem {
  constructor(parent, x, y, w, h, activationFunction) {
    this.parent = parent;
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || GElem.side();
    this.h = h || GElem.side();
    this.activationFunction = activationFunction;
    this.active = true;
  }
  addShortCut(shortCut) {
    shortCut.message = this;
    this.shortCut = shortCut;
    return this;
  }
  static side() {
    return 24;
  }
  size() {
    return { w: this.w, h: this.h };
  }
  getX() {
    return this.parent ? this.parent.getX() + this.x : this.x;
  }
  getY() {
    return this.parent ? this.parent.getY() + this.y : this.y;
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
  preload() {}
  display() {}
  mouseMoved(x, y) {}
  mousePressed(x, y) {}
  mouseReleased(x, y) {}
  mouseDragged(x, y) {}
}
