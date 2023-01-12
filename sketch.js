let bar;

function setup() {
  createCanvas(400, 400);
  balls = [];
  bar = new Bar();
  startButton = createButton("Start");
  startButton.mousePressed(startPlay);
}

function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    ball.update();
    ball.checkEdge();
    ball.collideWithBar(bar);
    ball.display();
  }
  bar.show();
}

function startPlay() {
  let ball = new Ball(0, 0);
  ball.velocity = createVector(3, 3);
  balls.push(ball);
}
