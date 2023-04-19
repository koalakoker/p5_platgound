class DiagManager {
  constructor() {
    this.clear();
  }
  clear() {
    this.dialogs = [];
  }
  display() {
    const diag = this.activeDiag();
    if (diag) {
      if (diag.notStarted) {
        if (diag.notStarted()) {
          diag.start();
        }
      }
      diag.draw();
    }
  }
  activeDiag() {
    return this.dialogs[0];
  }
  activeMessage() {
    return this.activeDiag().text;
  }
  addMessage(text, duration, fade) {
    return new Promise((resolve) => {
      duration ||= 3000;
      const textColor = p5js.color(255);
      const fadeIn = fade || 200;
      const fadeOut = fade || 200;
      this.dialogs.push(
        new Message(
          text,
          duration,
          textColor,
          (dialog) => {
            this.remove(dialog);
            resolve();
          },
          fadeIn,
          fadeOut
        )
      );
    });
  }
  addError(text, duration, fade) {
    return new Promise((resolve) => {
      duration ||= 5000;
      const textColor = p5js.color(255, 0, 0);
      const fadeIn = fade || 200;
      const fadeOut = fade || 200;
      const err = new Message(
        text,
        duration,
        textColor,
        (dialog) => {
          this.remove(dialog);
          resolve();
        },
        fadeIn,
        fadeOut
      );
      err.priority = 1;

      let i = this.findFirstDiagWithPriorityLessThan(err.priority);

      if (i === 0) {
        this.stopDisplayingTheActiveMessageAndResetTween();
      }

      this.dialogs.splice(i, 0, err);
    });
  }
  addWindw(w) {
    return new Promise((resolve, reject) => {
      w.resolve = resolve;
      w.reject = reject;
      w.onClose = () => {
        this.remove(w);
      };
      this.dialogs.push(w);
    });
  }
  findFirstDiagWithPriorityLessThan(priority) {
    if (this.dialogs.length === 0) {
      return 0;
    }
    for (let i = 0; i < this.dialogs.length; i++) {
      const dlg = this.dialogs[i];
      if (dlg.priority < priority) {
        return i;
      }
    }
    return this.dialogs.length;
  }
  stopDisplayingTheActiveMessageAndResetTween() {
    const diag = this.activeDiag();
    if (diag) {
      diag.pause();
    }
  }

  remove(dialog) {
    const i = this.dialogs.indexOf(dialog);
    this.dialogs.splice(i, 1);
  }

  mousePressed(x, y) {
    const diag = this.activeDiag();
    if (!diag) return;
    if (diag.mousePressed) {
      return diag.mousePressed(x, y);
    }
  }

  mouseReleased(x, y) {
    const diag = this.activeDiag();
    if (!diag) return;
    if (diag.mouseReleased) {
      return diag.mouseReleased(x, y);
    }
  }
}
