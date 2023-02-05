class PushButton extends Button {
  constructor(fileName, pushedCallBack) {
    super(fileName);
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
