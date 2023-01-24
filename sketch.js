function setup() {
  createCanvas(400, 400);
  oscillator = new Oscillator();
}

function draw() {
  background(0);
  oscillator.oscillate();
  oscillator.display();
}
