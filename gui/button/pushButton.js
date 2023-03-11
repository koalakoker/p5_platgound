class PushButton extends Button {
  constructor(parent, fileName, pushedCallBack) {
    super(parent, fileName);
    this.pushedCallBack = pushedCallBack;
  }
  click(debounceMilliseconds) {
    this.fillColor = this.clickColor();
    if (this.pushedCallBack) {
      this.pushedCallBack();
    }
    return super.click(debounceMilliseconds);
  }
  mousePressed(x, y) {
    if (this.inside(x, y)) {
      this.click();
      return true;
    }
    return false;
  }
}
