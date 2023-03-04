class Hints {
  constructor() {
    this.messages = [];
    this.messages.push("Use ctrl key to show and lock the main bar");
    this.messages.push("Hold shift key to select multiple shapes");
    const gui = Gui.getInstance();
    gui.addMessage(this.messages[floor(random(this.messages.length))]);
  }
}
