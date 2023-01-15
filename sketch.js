let grid;
let dim = 5;
let rows, cols;

function create2DArray(rows, cols) {
  let grid = Array(cols);
  for (let i = 0; i < grid.length; i++) {
    let col = grid[i];
    col = new Array(rows);
    for (let j = 0; j < col.length; j++) {
      col[j] = false;
    }
  }
  return grid;
}

function setup() {
  createCanvas(400, 400);
  cols = width / dim;
  rows = height / dim;
  grid = create2DArray(rows, cols);
  walker = new Walker(cols / 2, rows / 2);
  background(0);
}

function draw() {
  walker.draw();
  walker.walk();
}
