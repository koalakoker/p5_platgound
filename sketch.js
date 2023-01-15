let grid;
let dim = 40;
let rows, cols;

function create2DArray(rows, cols) {
  let grid = Array(cols);
  for (let i = 0; i < grid.length; i++) {
    let col = grid[i];
    col = new Array(rows);
  }
  return grid;
}

function setup() {
  createCanvas(400, 400);
  cols = width / dim;
  rows = height / dim;
  grid = create2DArray(rows, cols);
}

function draw() {
  background(0);
}
