class SymbolChar {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
  }
  setRandomChar() {
    this.value = String.fromCharCode(0x30a0 + floor(random(96)));
  }
  display() {
    fill(0, 255, 70);
    text(this.value, this.x, this.y);
    if (random() < 0.05) {
      this.setRandomChar();
    }
  }
  rainDown() {
    this.y = this.y > height ? 0 : this.y + this.speed;
  }
}
