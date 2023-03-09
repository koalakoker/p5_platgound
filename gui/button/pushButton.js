class PushButton extends Button {
  constructor(parent, fileName, pushedCallBack) {
    super(parent, fileName);
    this.pushedCallBack = pushedCallBack;
  }
  activate() {
    this.fillColor = this.clickColor();
    this.clickDebounce = 5;
    if (this.pushedCallBack) {
      this.pushedCallBack();
    }
  }
  mousePressed(x, y) {
    if (this.inside(x, y)) {
      this.activate();
      return true;
    }
  }
}
