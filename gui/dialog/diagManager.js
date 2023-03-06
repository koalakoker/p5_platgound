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
  remove(dialog) {
    const i = this.dialogs.indexOf(dialog);
    this.dialogs.splice(i, 1);
  }
}
