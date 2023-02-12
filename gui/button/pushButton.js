class PushButton extends Button {
  constructor(parent, fileName, pushedCallBack) {
    super(parent, fileName);
    this.pushedCallBack = pushedCallBack;
  }
  mousePressed() {
    if (this.inside()) {
      this.fillColor = this.clickColor();
      this.clickDebounce = 5;
      if (this.pushedCallBack) {
        this.pushedCallBack();
      }
      return true;
    }
  }
}
