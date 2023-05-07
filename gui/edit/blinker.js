class Blinker {
  constructor(blinkInterval) {
    this.alpha = 255;
    this.interval = setInterval(() => {
      if (this.alpha === 255) {
        this.alpha = 0;
      } else {
        this.alpha = 255;
      }
    }, blinkInterval * 1000);
  }
  value() {
    return this.alpha;
  }
  onClose() {
    clearInterval(this.interval);
  }
}
