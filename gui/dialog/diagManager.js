class DiagManager {
  constructor() {
    this.dialogs = [];
  }
  display() {
    const diag = this.activeDiag();
    if (diag) {
      if (diag.notStarted()) {
        diag.start();
      }
      diag.draw();
    }
  }
  activeDiag() {
    return this.dialogs[0];
  }
  addMessage(text, duration, fade) {
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
        },
        fadeIn,
        fadeOut
      )
    );
  }
  addError(text, duration, fade) {
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
      },
      fadeIn,
      fadeOut
    );
    err.priority = 1;

    let i = this.findFirstDiagWithPriorityLessThan(err.priority);
    this.dialogs.splice(i, 0, err);
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
  remove(dialog) {
    const i = this.dialogs.indexOf(dialog);
    this.dialogs.splice(i, 1);
  }
}
