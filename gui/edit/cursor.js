class Cursor extends GElem {
  constructor(parent, size) {
    super(parent, 0, 0, 0, size);
    this.setEditPosition(0);
  }

  editPosition() {
    return this.pos;
  }
  setEditPosition(pos) {
    this.pos = pos;
    const max = this.parent.editedText().length;
    if (this.pos > max) {
      this.pos = max;
    }
    if (this.pos < 0) {
      this.pos = 0;
    }
    if (this.setEditPositionCb) {
      this.setEditPositionCb(this.pos);
    }
  }
  registerSetEditPositionCb(setEditPositionCb) {
    this.setEditPositionCb = setEditPositionCb;
  }

  moveRight(pos) {
    const nPos = pos || 1;
    this.setEditPosition(this.pos + nPos);
  }
  moveLeft(pos) {
    const nPos = pos || 1;
    this.setEditPosition(this.pos - nPos);
  }

  draw() {
    const str = this.parent.editedText().substring(0, this.pos);
    const x = this.getX() + p5js.textWidth(str);
    const y = this.getY();
    p5js.strokeWeight(4);
    p5js.stroke(255, 255, 255);
    p5js.line(x, y, x, y + this.h);
    p5js.strokeWeight(1);
  }
}
