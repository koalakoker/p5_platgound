class DiagManager {
  constructor() {
    this.dialogs = [];
  }
  display() {
    if (this.dialogs.length != 0) {
      const diag = this.dialogs[0];
      if (diag.notStarted()) {
        diag.show();
      }
      diag.draw();
    }
  }
  addMessage(text) {
    const duration = 3000;
    const textColor = color(255);
    const fadeIn = 200;
    const fadeOut = 200;
    this.dialogs.push(
      new Message(
        text,
        duration,
        textColor,
        (dialog) => {
          this.remove(dialog);
          console.log("End");
        },
        fadeIn,
        fadeOut
      )
    );
  }
  addError(text) {
    const duration = 5000;
    const textColor = color(255, 0, 0);
    const fadeIn = 200;
    const fadeOut = 200;
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
