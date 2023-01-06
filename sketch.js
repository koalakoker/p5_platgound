class PerlinLoop {
  constructor(dn, min, max) {
    this.xc = random(dn, 1000);
    this.yc = random(dn, 1000);
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
    this.xLoop = new PerlinLoop(0.3, -width, width * 2);
    this.yLoop = new PerlinLoop(0.3, -height, height * 2);
    this.sLoop = new PerlinLoop(5, 10, 120);
    this.rLoop = new PerlinLoop(5, 100, 255);
    this.bLoop = new PerlinLoop(5, 100, 255);
  }
  draw() {
    noStroke();
    let x = this.xLoop.generate(a);
    let y = this.yLoop.generate(a);
    let s = this.sLoop.generate(a);
    let r = this.rLoop.generate(a);
    let b = this.bLoop.generate(a);
    fill(r, 50, b, 200);
    ellipse(x, y, s, s);
  }
}

let balls = new Array(100);

function setup() {
  createCanvas(600, 600);
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

  a += TWO_PI / 240;

  //noLoop();
}
