class LinePicker extends Picker {
  constructor(parent, weight, cbWeightChaged, x, y) {
    super(parent, x, y);
    this.space = 30;
    this.weight = weight;
    this.weights = [];
    this.weights.push(1);
    this.weights.push(2);
    this.weights.push(3);
    this.weights.push(4);
    this.weights.push(5);
    this.weights.push(6);
    this.weights.push(7);
    this.weights.push(8);
    this.weights.push(9);
    this.weights.push(10);
    const l = this.weights.length;
    this.hPick = this.space * l;
    this.cbWeightChaged = cbWeightChaged;
  }
  display() {
    p5js.stroke(255);
    p5js.strokeWeight(1);
    p5js.fill(0);
    p5js.rect(this.getX(), this.getY(), this.size().w, this.size().h);
    p5js.strokeWeight(this.weight);
    const m = 4;
    p5js.line(
      this.getX() + m,
      this.getY() + m,
      this.getX() + this.size().w - m,
      this.getY() + this.size().h - m
    );
    if (this.selected) {
      p5js.strokeWeight(1);
      const l = this.weights.length;
      this.hPick = this.space * l;
      p5js.rect(this.basePoint().x, this.basePoint().y, this.side, this.hPick);
      for (let i = 0; i < l; i++) {
        const y = this.space / 2 + this.basePoint().y + i * this.space;
        p5js.strokeWeight(this.weights[i]);
        if (this.weight === this.weights[i]) {
          p5js.stroke(255, 255, 0);
          p5js.strokeWeight(this.weights[i] + 1);
        } else {
          p5js.stroke(255, 255, 255);
        }
        p5js.line(
          this.basePoint().x + 10,
          y,
          this.basePoint().x + this.side - 10,
          y
        );
      }
    }
  }
  inside(x, y) {
    return super.inside(x, y) || this.insidePicker(x, y);
  }
  insidePicker(x, y) {
    return Rect.inside(
      x,
      y,
      this.basePoint().x,
      this.basePoint().y,
      this.side,
      this.hPick
    );
  }
  mousePressed(x, y) {
    if (super.mousePressed(x, y)) {
      return true;
    }
    if (this.insidePicker(x, y) && this.selected) {
      const i = p5js.floor((x - this.basePoint().y) / this.space);
      this.weight = i + 1;
      if (this.cbWeightChaged) {
        this.cbWeightChaged(this.weight);
      }
      return true;
    }
  }
}
