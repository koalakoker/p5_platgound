let grid;
let dim = 20;
let rows, cols;

function create2DArray(rows, cols) {
  let grid = new Array(cols);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(rows);
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = false;
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
  grid[int(cols / 2)][int(rows / 2)] = true;
  background(0);
  rectMode(CENTER);
}

function draw() {
  walker.draw();
  walker.walk(grid);
  grid[walker.pos.x][walker.pos.y] = true;
}

function drawGrid() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j]) {
        fill(255, 0, 0, 10);
        rect(i * dim, j * dim, dim, dim);
      }
    }
  }
}
