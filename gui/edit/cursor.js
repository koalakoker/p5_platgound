class Cursor extends GElem {
  constructor(parent, size) {
    super(parent, 0, 0, 0, size);
    this.setEditPosition(0);
    this.sel = false;
  }
  editPosition() {
    if (this.selStart < this.selStop)
      return { start: this.selStart, stop: this.selStop };
    else return { start: this.selStop, stop: this.selStart };
  }
  setEditPosition(pos) {
    this.selStart = pos;
    this.selStop = pos;
  }
  setSelection(start, stop) {
    if (start === stop) {
      this.setEditPosition(start);
    } else {
      this.selStart = start;
      this.selStop = stop;
      this.sel = true;
    }
  }

  extendSelectionRight(pos) {
    const nPos = pos || 1;
    this.beforeExtendSelection();
    this.selStop += nPos;
  }
  extendSelectionLeft(pos) {
    const nPos = pos || 1;
    this.beforeExtendSelection();
    this.selStop -= nPos;
  }
  beforeExtendSelection() {
    if (!this.sel) {
      this.sel = true;
    }
  }

  moveRight(pos) {
    const nPos = pos || 1;
    if (this.sel) {
      this.setEditPosition(this.editPosition().stop);
      this.sel = false;
    } else {
      this.selStart += nPos;
      this.selStop += nPos;
    }
  }
  moveLeft(pos) {
    const nPos = pos || 1;
    if (this.sel) {
      this.setEditPosition(this.editPosition().start);
      this.sel = false;
    } else {
      this.selStart -= nPos;
      this.selStop -= nPos;
    }
  }

  isSelectionActive() {
    return this.sel;
  }
  selectionActive(state) {
    this.sel = state;
  }

  draw() {
    if (!this.sel) {
      const str = this.parent.editedText().substring(0, this.selStart);
      const x = this.getX() + p5js.textWidth(str);
      const y = this.getY();
      p5js.stroke(255, 0, 0);
      p5js.line(x, y, x, y + this.h);
    }
  }
}
