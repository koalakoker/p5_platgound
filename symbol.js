class SymbolChar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.value;
  }
  setRandomChar() {
    this.value = String.fromCharCode(0x30a0 + floor(random(96)));
  }
  display() {
    fill(0, 255, 70);
    text(this.value, this.x, this.y);
  }
}
