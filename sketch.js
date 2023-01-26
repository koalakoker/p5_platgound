let w = [];

function setup() {
  createCanvas(800, 400);
  for (let i = 0; i < 10; i++) {
    w.push(
      new Wave(
        random(width / 2),
        random(height),
        random(20, 100),
        random(20, 300),
        random(0.5, 2)
      )
    );
  }
}

function draw() {
  background(0);
  for (let i = 0; i < w.length; i++) {
    w[i].display();
  }
}
