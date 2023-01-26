let symbol;
let symbolSize = 27;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  symbol = new SymbolChar(width / 2, height / 2);
  symbol.setRandomChar();
  textSize(symbolSize);
}

function draw() {
  background(0);
  symbol.display();
}
