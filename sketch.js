let fireWork;

function setup() {
  createCanvas(400, 600);
  fireWork = new FireWork();
}

function draw() {
  background(0);
  fireWork.update();
  fireWork.display();
}
