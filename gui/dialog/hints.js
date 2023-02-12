class Hints {
  constructor() {
    this.messages = [];
    this.messages.push("Use ctrl key to show and lock the main bar");
    this.messages.push("Hold shift key to select multiple shapes");
    this.messages.push("message3");
    this.messages.push("message4");
    gui.showDialog(this.messages[floor(random(this.messages.length))]);
  }
}
