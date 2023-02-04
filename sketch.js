let drawing;
let bar = new Group(0, 0);

let buttonAddLine = new Button(
  "png/addLine.png",
  () => {
    drawing.changeState(new stateAddLine(drawing.grid));
  },
  () => {
    drawing.changeState(null);
  }
);
bar.append(buttonAddLine);

let buttonAddRect = new Button(
  "png/addRect.png",
  () => {
    drawing.changeState(new stateAddRect(drawing.grid));
  },
  () => {
    drawing.changeState(null);
  }
);
bar.append(buttonAddRect);

let buttonAddCircle = new Button(
  "png/addCircle.png",
  () => {
    drawing.changeState(new stateAddCircle(drawing.grid));
  },
  () => {
    drawing.changeState(null);
  }
);
bar.append(buttonAddCircle);

function preload() {
  bar.preload();
}

function setup() {
  drawing = new Drawing(window.innerWidth, window.innerHeight);
  drawing.setup();
}

function draw() {
  drawing.draw();
  bar.display();
}

function mouseMoved() {
  bar.mouseMoved();
}

function mousePressed() {
  if (bar.inside()) {
    bar.mousePressed();
  } else {
    drawing.mousePressed();
  }
}

function mouseReleased() {
  if (bar.inside()) {
    bar.mouseReleased();
  }
  drawing.mouseReleased();
}

function mouseDragged() {
  drawing.mouseDragged();
}
