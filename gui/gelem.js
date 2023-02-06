class GElem {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
  static side() {
    return 24;
  }
  updateChildren() {}
  size() {
    return { x: GElem.side(), y: GElem.side() };
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
  preload() {}
  display() {}
  mouseMoved() {}
  mousePressed() {}
  mouseReleased() {}
  mouseDragged() {}
}
