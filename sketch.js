class PerlinLoop {
  constructor(dn, min, max) {
    this.xc = dn;
    this.yc = dn;
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

let loops = new Array(10);

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < loops.length; i++) {
    let r = random(0.5, 1);
    loops[i] = new PerlinLoop(r, 50, 200);
  }
}

let zn = 0;

function draw() {
  background(0);
  stroke(255);
  noFill();
  translate(width / 2, height / 2);
  loops.forEach((loop) => {
    beginShape();
    for (let a = 0; a <= TWO_PI; a += TWO_PI / 100) {
      let r = loop.generate(a, zn);
      let x = r * cos(a);
      let y = r * sin(a);
      vertex(x, y);
    }
    endShape();
  });

  zn += 0.1;
  //noLoop();
}
