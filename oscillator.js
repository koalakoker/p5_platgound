class Oscillator {
  constructor() {
    this.angle = createVector();
    this.velocity = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
    this.amplitude = createVector(random(width / 2), random(height / 2));
  }
  oscillate() {
    this.angle.add(this.velocity);
  }
  display() {
    let x = this.amplitude.x * sin(this.angle.x);
    let y = this.amplitude.y * sin(this.angle.y);
    push();
    translate(width / 2, height / 2);
    stroke(255);
    fill(80);
    line(0, 0, x, y);
    circle(x, y, 16);
    pop();
  }
}
