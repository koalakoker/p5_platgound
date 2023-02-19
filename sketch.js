function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  const test = new Test();
  //test.test1();
  test.checkKeyStateIsEqual();
}

function draw() {
  background(0);
}
