class LinePicker extends Picker {
  constructor(x, y) {
    super(x, y);
    this.weight = 1;
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
      rect(this.basePoint().x, this.basePoint().y, this.side, this.side);
    }
  }
}
