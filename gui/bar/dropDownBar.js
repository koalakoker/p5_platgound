class DropDownBar extends Bar {
  constructor(parent, x, y) {
    super(parent, x, y + 1);
    this.hideY = y - GElem.side();
    this.showY = y + 1;
    this.visible = true;
    this.lock_ = true;
    this.fadeIn = 300;
    this.fadeOut = 600;
  }
  show() {
    this.tween = p5.tween.manager
      .addTween(this)
      .addMotion("y", this.showY, this.fadeIn, "easeInOutQuad")
      .onEnd(() => {
        this.visible = true;
      });
    this.tween.startTween();
  }
  hide() {
    this.tween = p5.tween.manager
      .addTween(this)
      .addMotion("y", this.hideY, this.fadeOut, "easeInOutQuad")
      .onEnd(() => {
        this.visible = false;
      });
    this.tween.startTween();
  }
  lock() {
    this.lock_ = true;
  }
  unlock() {
    this.lock_ = false;
  }
  isLock() {
    return this.lock_;
  }
  mouseMoved(x, y) {
    if (y < this.y + 5 && !this.visible) {
      this.show();
    } else if (y > this.y + this.size().h + 20 && this.visible && !this.lock_) {
      this.hide();
    }
    super.mouseMoved(x, y);
  }
}
