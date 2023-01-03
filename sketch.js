function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  let mouse = createVector(mouseX, mouseY);
  let center = createVector(width / 2, height / 2);

  //stroke(10);
  //line(0, 0, mouse.x, mouse.y);
  //line(0, 0, center.x, center.y);

  mouse.sub(center);

  let h = mouse.mag();
  fill(255);
  rect(0, 0, h, 10);

  stroke(255);
  translate(width / 2, height / 2);
  line(0, 0, mouse.x, mouse.y);
}
