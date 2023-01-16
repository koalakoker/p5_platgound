let grid;
let dim = 40;
let rows, cols;

function create2DArray(rows, cols) {
  let grid = Array(cols);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(rows);
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = floor(random(2));
    }
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
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j]) {
        fill(255);
        rect(i * dim, j * dim, dim, dim);
      }
    }
  }
}
