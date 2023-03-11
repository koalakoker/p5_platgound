class DropDownBar extends Bar {
  constructor(parent, x, y) {
    super(parent, x, y + 1);
    this.hideY = y - GElem.side();
    this.showY = y + 1;
    this.visible = true;
    this.lock_ = true;
    this.fadeIn = 300;
    this.fadeOut = 600;
    this.tweenOngoing = false;
    this.lockShortCut = new ShortCut(new KeyState("l").addCtrl(), (k) => {
      if (this.isLock()) {
        this.unlock();
      } else {
        this.lock();
      }
    });
  }
  show() {
    this.tween = p5.tween.manager
      .addTween(this)
      .addMotion("y", this.showY, this.fadeIn, "easeInOutQuad")
      .onEnd(() => {
        this.visible = true;
        this.tweenOngoing = false;
      });
    this.tween.startTween();
    this.tweenOngoing = true;
  }
  hide() {
    this.tween = p5.tween.manager
      .addTween(this)
      .addMotion("y", this.hideY, this.fadeOut, "easeInOutQuad")
      .onEnd(() => {
        this.visible = false;
        this.tweenOngoing = false;
      });
    this.tween.startTween();
    this.tweenOngoing = true;
  }
  lock() {
    this.lock_ = true;
    if (!this.visible) {
      this.show();
    }
  }
  unlock() {
    this.lock_ = false;
  }
  isLock() {
    return this.lock_;
  }
  mouseMoved(x, y) {
    super.mouseMoved(x, y);
    if (this.tweenOngoing) {
      return;
    }
    if (y < this.y + this.size().h + 5 && !this.visible) {
      this.show();
    } else if (y > this.y + this.size().h + 20 && this.visible && !this.lock_) {
      this.hide();
    }
  }
}
