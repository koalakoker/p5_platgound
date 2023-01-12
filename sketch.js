let drawElement = [];

function setup() {
  createCanvas(400, 400);
  drawElement.push(new Rectangle(100, 100, width - 100, height - 100));
  drawElement.push(new Circle(width / 2, height / 2, 100));
  drawElement.push(new Line(0, 0, width, height));
}

function draw() {
  background(0);
  for (let i = 0; i < drawElement.length; i++) {
    const element = drawElement[i];
    element.draw();
  }
}
