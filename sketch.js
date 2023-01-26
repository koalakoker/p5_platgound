let symbolSize = 27;
let stream;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  stream = new Stream(width / 2, random(10, 20));
  textSize(symbolSize);
}

function draw() {
  background(0);
  stream.display();
}
