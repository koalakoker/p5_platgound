class PerlinLoop {
  constructor(dn, min, max) {
    this.xc = random(dn, 10000);
    this.yc = random(dn, 10000);
    this.dn = dn;
    this.min = min;
    this.max = max;
  }
  generate(a, zn) {
    let xn = this.xc + this.dn * cos(a);
    let yn = this.yc + this.dn * sin(a);
    let r = map(noise(xn, yn, zn), 0, 1, this.min, this.max);
    return r;
  }
}

class ball {
  constructor() {
    this.xLoop = new PerlinLoop(random(0.5, 1), -width * 0.5, width * 1.5);
    this.yLoop = new PerlinLoop(random(0.5, 1), -height * 0.5, height * 1.5);
    this.sLoop = new PerlinLoop(random(4, 5), 5, 30);
    this.cLoop = new PerlinLoop(random(5, 10), 100, 255);
  }
  draw() {
    noStroke();
    let x = this.xLoop.generate(a);
    let y = this.yLoop.generate(a);
    let s = this.sLoop.generate(a);
    let c = this.cLoop.generate(a);
    fill(c, 0, c, 150);
    ellipse(x, y, s, s);
  }
}

let balls = new Array(100);

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < balls.length; i++) {
    balls[i] = new ball();
  }
}

let a = 0;

function draw() {
  background(0);

  balls.forEach((ball) => {
    ball.draw();
  });

  a += TWO_PI / 1000;

  //noLoop();
}
