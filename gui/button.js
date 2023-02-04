class Button {
  constructor(x, y, fileName) {
    this.x = x;
    this.y = y;
    this.fileName = fileName;
    this.fillColor = 180;
  }
  preload() {
    this.img = loadImage(this.fileName);
  }
  display() {
    let size = Button.size();
    fill(this.fillColor);
    rect(this.x, this.y, size, size);
    image(this.img, this.x, this.y, size, size);
  }
  static size() {
    return 24;
  }
  inside() {
    return Rect.inside(
      mouseX,
      mouseY,
      this.x,
      this.y,
      Button.size(),
      Button.size()
    );
  }
  mouseMoved() {
    if (this.inside()) {
      this.fillColor = 210;
    } else {
      this.fillColor = 180;
    }
  }
  mousePressed() {
    if (this.inside()) {
      this.fillColor = 255;
    }
  }
}
