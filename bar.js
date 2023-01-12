class Bar {
  constructor() {
    this.s = createSlider(0, 1, 0.5, 0.01);
    rectMode(CENTER);
    this.position = createVector(width / 2, height - 50);
    this.w = 60;
    this.h = 10;
  }
  show() {
    let pos = this.s.value();
    this.position.x = pos * width;
    this.position.y = height - 50;
    stroke(255);
    fill(200);
    rect(this.position.x, this.position.y, this.w, this.h);
  }
  inside(ball) {
    let x = this.position.x;
    let y = this.position.y;
    let w = this.w;
    let h = this.h;
    return (
      ball.position.x + ball.r > x - w / 2 &&
      ball.position.x + ball.r < x + w / 2 &&
      ball.position.y + ball.r > y - h / 2 &&
      ball.position.y + ball.r < y + h / 2
    );
  }
}
