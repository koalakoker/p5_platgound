class Button extends GElem {
  constructor(parent, fileName) {
    super(parent);
    this.fileName = fileName;
    this.clickDebounce = 0;
  }
  preload() {
    this.img = loadImage(this.fileName);
    this.fillColor = this.normalColor();
  }
  display() {
    stroke(255);
    strokeWeight(1);
    fill(this.fillColor);

    rect(this.getX(), this.getY(), this.size().w, this.size().h);
    image(this.img, this.getX(), this.getY(), this.size().w, this.size().h);
    if (this.clickDebounce > 0) {
      this.clickDebounce--;
      this.mouseMoved();
    }
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
