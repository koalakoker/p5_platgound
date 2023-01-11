class Bar {
  constructor() {
    this.s = createSlider(0, 1, 0.5, 0.01);
    rectMode(CENTER);
  }
  show() {
    let pos = this.s.value();
    stroke(255);
    fill(200);
    rect(pos * width, height - 50, 60, 10);
  }
  inside(ballPosition, ballRadius) {
    let pos = this.s.value();
    let x = pos * width;
    let y = height - 50;
    let w = 60;
    let h = 10;
    return (
      ballPosition.x > x - w &&
      ballPosition.x < x + w &&
      ballPosition.y > y - h &&
      ballPosition.y < y + h
    );
  }
}
