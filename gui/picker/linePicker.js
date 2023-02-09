class LinePicker extends Picker {
  constructor(weight, cbWeightChaged, x, y) {
    super(x, y);
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
    stroke(255);
    strokeWeight(1);
    fill(0);
    rect(this.x, this.y, this.size().x, this.size().y);
    strokeWeight(this.weight);
    const m = 4;
    line(
      this.x + m,
      this.y + m,
      this.x + this.size().x - m,
      this.y + this.size().y - m
    );
    if (this.selected) {
      strokeWeight(1);
      const l = this.weights.length;
      this.hPick = this.space * l;
      rect(this.basePoint().x, this.basePoint().y, this.side, this.hPick);
      for (let i = 0; i < l; i++) {
        const y = this.space / 2 + this.basePoint().y + i * this.space;
        strokeWeight(this.weights[i]);
        if (this.weight === this.weights[i]) {
          stroke(255, 255, 0);
          strokeWeight(this.weights[i] + 1);
        } else {
          stroke(255, 255, 255);
        }
        line(
          this.basePoint().x + 10,
          y,
          this.basePoint().x + this.side - 10,
          y
        );
      }
    }
  }
  inside() {
    return super.inside() || this.insidePicker();
  }
  insidePicker() {
    return Rect.inside(
      mouseX,
      mouseY,
      this.basePoint().x,
      this.basePoint().y,
      this.side,
      this.hPick
    );
  }
  mousePressed() {
    if (super.mousePressed()) {
      return true;
    }
    if (this.insidePicker() && this.selected) {
      const i = floor((mouseY - this.basePoint().y) / this.space);
      this.weight = i + 1;
      if (this.cbWeightChaged) {
        this.cbWeightChaged(this.weight);
      }
    }
  }
}
