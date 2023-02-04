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
  mouseMoved() {
    if (
      mouseX > this.x &&
      mouseX < this.x + Button.size() &&
      mouseY > this.y &&
      mouseY < this.y + Button.size()
    ) {
      this.fillColor = 210;
    } else {
      this.fillColor = 180;
    }
  }
}
