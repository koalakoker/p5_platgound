class DropDownBar extends Bar {
  constructor(parent, x, y) {
    super(parent, x, y + 1);
    this.hideY = y - GElem.side();
    this.showY = y + 1;
    this.visible = true;
    this.lock = true;
    this.fadeIn = 300;
    this.fadeOut = 600;
  }
  show() {
    p5.tween.manager
      .addTween(this)
      .addMotion("y", this.showY, this.fadeIn, "easeInOutQuad")
      .onEnd(() => {})
      .startTween();
    this.visible = true;
  }
  hide() {
    p5.tween.manager
      .addTween(this)
      .addMotion("y", this.hideY, this.fadeOut, "easeInOutQuad")
      .onEnd(() => {})
      .startTween();
    this.visible = false;
  }
  mouseMoved() {
    if (mouseY < 5 && !this.visible) {
      this.show();
    } else if (mouseY > this.size().h + 20 && this.visible && !this.lock) {
      this.hide();
    }
  }
}
