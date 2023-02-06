class Slider {
  constructor(w, h) {
    this.x = 0;
    this.y = 0;
    this.value = h / 2;
    this.w = w;
    this.h = h;
  }
  display(x, y) {
    this.x = x;
    this.y = y;
    rect(x, y, this.w, this.h);
    noStroke();
    fill(255);
    const dividers = 20;
    const bcHeight = this.h / dividers;
    let bcY = this.value + y;
    rect(x, bcY - bcHeight / 2, this.w, bcHeight);
  }
  inside() {
    return Rect.inside(mouseX, mouseY, this.x, this.y, this.w, this.h);
  }
}
