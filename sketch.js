let drawElement = [];
let dragging = false;
let state;
let newElementStyle;

function setup() {
  createCanvas(400, 400);
  sel = createSelect();
  sel.option("");
  sel.option("addLine");
  sel.option("addCircle");
  sel.option("addRect");

  sel.selected("addCircle");
  state = new stateAddCircle();

  sel.changed(changeMode);

  newElementStyle = new Style();
  fillColorPicker = createColorPicker(newElementStyle.fillColor);
  fillColorPicker.input(changeFillColor);
  strokeColorPicker = createColorPicker(newElementStyle.strokeColor);
  strokeColorPicker.input(changeStrokeColor);
}

function changeFillColor() {
  newElementStyle.fillColor = fillColorPicker.color();
}

function changeStrokeColor() {
  newElementStyle.strokeColor = strokeColorPicker.color();
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
