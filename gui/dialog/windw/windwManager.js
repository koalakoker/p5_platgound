class WindwManager {
  constructor() {
    this.clear();
  }
  clear() {
    this.windw = [];
  }
  draw() {
    this.windw.forEach((windw) => {
      windw.draw();
    });
  }
  addWindw(w) {
    return new Promise((resolve, reject) => {
      w.resolve = resolve;
      w.reject = reject;
      w.registerCloseCb(() => {
        this.remove(w);
      });
      this.windw.push(w);
    });
  }
  remove(dialog) {
    const i = this.windw.indexOf(dialog);
    this.windw.splice(i, 1);
  }

  mousePressed(x, y) {
    this.windw.forEach((windw) => {
      if (windw.mousePressed) {
        return windw.mousePressed(x, y);
      }
    });
  }

  mouseReleased(x, y) {
    this.windw.forEach((windw) => {
      if (windw.mouseReleased) {
        return windw.mouseReleased(x, y);
      }
    });
  }
}
