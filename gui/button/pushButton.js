class PushButton extends Button {
  constructor(parent, fileName, pushedCallBack, shortCut) {
    super(parent, fileName, shortCut);
    this.pushedCallBack = pushedCallBack;
  }
  activate() {
    this.fillColor = this.clickColor();
    this.clickDebounce = 5;
    if (this.pushedCallBack) {
      this.pushedCallBack();
    }
  }
  mousePressed() {
    if (this.inside()) {
      this.activate();
      return true;
    }
  }
  keyPressed() {
    if (this.shortCut) {
      if (this.shortCut.keyPressed()) {
        this.activate();
        return true;
      }
    }
  }
  keyReleased() {
    if (this.shortCut) {
      this.shortCut.keyReleased();
    }
  }
}
