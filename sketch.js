let bar;

function setup() {
  createCanvas(400, 400);
  balls = [];
  let ball = new Ball(random(width), random(height));
  ball.velocity = createVector(random(3), random(3));
  balls.push(ball);
  bar = new Bar();
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
