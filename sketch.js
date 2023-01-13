let drawElement = [];
let dragging = false;
let state;

function setup() {
  createCanvas(400, 400);
  sel = createSelect();
  sel.option("");
  sel.option("addLine");
  sel.option("addCircle");
  sel.option("addRect");
  sel.selected("");
  sel.changed(changeMode);
}

function changeMode() {
  let selected = sel.value();
  switch (selected) {
    case "addLine":
      state = new stateAddLine();
      break;
    case "addCircle":
      state = new stateAddCircle();
      break;
    case "addRect":
      state = new stateAddRect();
      break;

    default:
      state = null;
      break;
  }
}

function draw() {
  background(0);
  for (let i = 0; i < drawElement.length; i++) {
    const element = drawElement[i];
    element.draw();
  }
  if (state) {
    state.draw();
  }
}

function mousePressed() {
  if (state) {
    if (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height) {
      dragging = true;
      state.mousePressed();
    }
  }
}

function mouseReleased() {
  if (state) {
    dragging = false;
    drawElement.push(state.mouseReleased());
  }
}

function mouseDragged() {
  if (state) {
    if (dragging) {
      state.mouseDragged();
    }
  }
}
