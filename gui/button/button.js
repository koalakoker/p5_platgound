class Button {
  constructor(fileName) {
    this.x = 0;
    this.y = 0;
    this.fileName = fileName;
    this.clickDebounce = 0;
  }
  preload() {
    this.img = loadImage(this.fileName);
    this.fillColor = this.normalColor();
  }
  display() {
    fill(this.fillColor);
    rect(this.x, this.y, this.size().x, this.size().y);
    image(this.img, this.x, this.y, this.size().x, this.size().y);
    if (this.clickDebounce > 0) {
      this.clickDebounce--;
      this.mouseMoved();
    }
  }
  updateChildren() {}
  static side() {
    return 24;
  }
  size() {
    return { x: Button.side(), y: Button.side() };
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
    if (this.clickDebounce > 0) {
      return;
    }
    if (this.inside()) {
      this.fillColor = this.overColor();
    } else {
      this.fillColor = this.normalColor();
    }
  }
  mousePressed() {
    if (this.inside()) {
      this.fillColor = this.clickColor();
      this.clickDebounce = 5;
    }
    return false;
  }
  mouseReleased() {
    this.mouseMoved();
  }
  normalColor() {
    return this.unSelectedColor();
  }
  overColor() {
    return this.unSelectedOverColor();
  }
  clickColor() {
    return color(255, 255, 255);
  }
  selectedColor() {
    return color(130, 200, 130);
  }
  unSelectedColor() {
    return color(180, 180, 180);
  }
  selectedOverColor() {
    return color(160, 230, 160);
  }
  unSelectedOverColor() {
    return color(230, 230, 230);
  }
}
