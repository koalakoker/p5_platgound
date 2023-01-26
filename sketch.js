function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  pendulum = new Pendulum();
}

function draw() {
  background(0);
  pendulum.update();
  pendulum.display();
}
