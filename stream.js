class Stream {
  constructor(x, size) {
    this.x = x;
    this.speed = random(5, 10);
    this.symbols = [];
    for (let i = 0; i < size; i++) {
      let symbol = new SymbolChar(this.x, -i * symbolSize, this.speed);
      symbol.setRandomChar();
      this.symbols.push(symbol);
    }
  }
  display() {
    this.symbols.forEach((symbol) => {
      symbol.rainDown();
      symbol.display();
    });
  }
}
