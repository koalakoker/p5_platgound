class Wave {
  constructor(x, y, amplitude, length, period) {
    this.x = x;
    this.y = y;
    this.cycles = 100;
    this.step = length / this.cycles;
    this.amplitude = amplitude;
    this.aVel = (period * TWO_PI) / this.cycles;
    this.startAngle = 0;
  }
  display() {
    let angle = this.startAngle;
    this.startAngle += 0.1;
    beginShape();
    for (let i = 0; i < this.cycles; i++) {
      let x = this.x + i * this.step;
      let y = this.amplitude * sin(angle);
      noFill();
      stroke(255);
      strokeWeight(1);
      vertex(x, this.y + y);
      angle += this.aVel;
    }
    endShape();
  }
}
