class Cursor extends GElem {
  constructor(parent, size) {
    super(parent, 0, 0, 0, size);
    this.setEditPosition(0);
  }
  detach() {
    kl.detach(this.shortCut);
    kl.detach(this.shortCutSh);
  }
  editPosition() {
    return this.pos;
  }
  setEditPosition(pos) {
    this.pos = pos;
  }
  moveRight(pos) {
    const nPos = pos || 1;
    this.pos += nPos;
  }
  moveLeft(pos) {
    const nPos = pos || 1;
    this.pos -= nPos;
  }
  draw() {
    const str = this.parent.editedText().substring(0, this.pos);
    const x = this.getX() + p5js.textWidth(str);
    const y = this.getY();
    p5js.stroke(255, 0, 0);
    p5js.line(x, y, x, y + this.h);
  }
}
