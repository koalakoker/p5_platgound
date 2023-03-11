class Button extends GElem {
  constructor(parent, fileName) {
    super(parent);
    this.fileName = fileName;
    this.clickDebounce = false;
    this.fillColor = this.normalColor();
  }
  preload() {
    this.img = p5js.loadImage(this.fileName);
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
  }
  click() {
    return new Promise((resolve) => {
      this.clickDebounce = true;
      setTimeout(() => {
        this.clickDebounce = false;
        this.mouseMoved(this.lastX, this.lastY);
        resolve();
      }, 200);
    });
  }
  isDebounce() {
    return this.clickDebounce;
  }
  mouseMoved(x, y) {
    this.lastX = x;
    this.lastY = y;
    if (this.clickDebounce) {
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
