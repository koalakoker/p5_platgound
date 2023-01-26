let symbolSize = 16;
let streams = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (let i = 0; i < width / symbolSize; i++) {
    streams.push(new Stream(i * symbolSize, random(20, 30)));
  }
  textSize(symbolSize);
}

function draw() {
  background(0);
  streams.forEach((stream) => {
    stream.display();
  });
}
