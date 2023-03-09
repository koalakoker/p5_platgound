class Button extends GElem {
  constructor(parent, fileName) {
    super(parent);
    this.fileName = fileName;
    this.clickDebounce = 0;
  }
  preload() {
    this.img = p5js.loadImage(this.fileName);
    this.fillColor = this.normalColor();
  }
  display() {
    p5js.stroke(255);
    p5js.strokeWeight(1);
    p5js.fill(this.fillColor);

    p5js.rect(this.getX(), this.getY(), this.size().w, this.size().h);
    p5js.image(
      this.img,
      this.getX(),
      this.getY(),
      this.size().w,
      this.size().h
    );
    if (this.clickDebounce > 0) {
      this.clickDebounce--;
      this.mouseMoved();
    }
  }
  mouseMoved(x, y) {
    if (this.clickDebounce > 0) {
      return;
    }
    if (this.inside(x, y)) {
      this.fillColor = this.overColor();
    } else {
      this.fillColor = this.normalColor();
    }
  }
  mousePressed(x, y) {
    if (this.inside(x, y)) {
      this.fillColor = this.clickColor();
      this.clickDebounce = 5;
    }
    return false;
  }
  mouseReleased(x, y) {
    this.mouseMoved(x, y);
  }
  normalColor() {
    return this.unSelectedColor();
  }
  overColor() {
    return this.unSelectedOverColor();
  }
  clickColor() {
    return p5js.color(255, 255, 255);
  }
  selectedColor() {
    return p5js.color(130, 200, 130);
  }
  unSelectedColor() {
    return p5js.color(180, 180, 180);
  }
  selectedOverColor() {
    return p5js.color(160, 230, 160);
  }
  unSelectedOverColor() {
    return p5js.color(230, 230, 230);
  }
}
