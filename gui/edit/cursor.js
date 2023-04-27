class Cursor extends GElem {
  constructor(parent, size) {
    super(parent, 0, 0, 0, size);
    this.setEditPosition(0);
    this.sel = false;
    this.selStart = 0;
    this.selStop = 0;
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

  extendSelectionRight(pos) {
    const nPos = pos || 1;
    this.beforeExtendSelection();
    this.pos2 += nPos;
    this.afterExtendSelection();
  }
  extendSelectionLeft(pos) {
    const nPos = pos || 1;
    this.beforeExtendSelection();
    this.pos2 -= nPos;
    this.afterExtendSelection();
  }
  beforeExtendSelection() {
    if (!this.sel) {
      this.sel = true;
      this.pos2 = this.pos;
    }
  }
  afterExtendSelection() {
    if (this.pos < this.pos2) {
      this.selStart = this.pos;
      this.selStop = this.pos2;
    } else {
      this.selStart = this.pos2;
      this.selStop = this.pos;
    }
  }

  moveRight(pos) {
    const nPos = pos || 1;
    if (this.sel) {
      this.pos = this.selStop;
      this.sel = false;
    } else {
      this.pos += nPos;
    }
  }
  moveLeft(pos) {
    const nPos = pos || 1;
    if (this.sel) {
      this.pos = this.selStart;
      this.sel = false;
    } else {
      this.pos -= nPos;
    }
  }
  isSelectionActive() {
    return this.sel;
  }
  draw() {
    if (!this.sel) {
      const str = this.parent.editedText().substring(0, this.pos);
      const x = this.getX() + p5js.textWidth(str);
      const y = this.getY();
      p5js.stroke(255, 0, 0);
      p5js.line(x, y, x, y + this.h);
    }
  }
}
