class Cursor extends GElem {
  constructor(parent, size) {
    super(parent, 0, 0, 0, size);
    this.setEditPosition(0);
    this.setSelection(0, 0);
  }
  editPosition() {
    return this.pos;
  }
  selection() {
    if (this.selStart < this.selStop)
      return { start: this.selStart, stop: this.selStop };
    else return { start: this.selStop, stop: this.selStart };
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
    this.setSelection(this.pos, this.pos);
  }
  setSelection(start, stop) {
    this.selStart = start;
    this.selStop = stop;
  }

  extendSelectionRight(pos) {
    const nPos = pos || 1;
    this.selStop += nPos;
    const max = this.parent.editedText().length;
    if (this.selStop > max) {
      this.selStop = max;
    }
  }
  extendSelectionLeft(pos) {
    const nPos = pos || 1;
    this.selStop -= nPos;
    if (this.selStop < 0) {
      this.selStop = 0;
    }
  }

  moveRight(pos) {
    const nPos = pos || 1;
    this.setEditPosition(this.pos + nPos);
  }
  moveLeft(pos) {
    const nPos = pos || 1;
    this.setEditPosition(this.pos - nPos);
  }

  isSelectionActive() {
    return this.selStart !== this.selStop;
  }

  draw() {
    const str = this.parent.editedText().substring(0, this.pos);
    const x = this.getX() + p5js.textWidth(str);
    const y = this.getY();
    p5js.stroke(255, 0, 0);
    p5js.line(x, y, x, y + this.h);
  }
}
