let grid;
let dim = 5;
let rows, cols;

function create2DArray(rows, cols) {
  let grid = Array(cols);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(rows);
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = boolean(floor(random(2)));
    }
  }
  return grid;
}

function cloneArray(other) {
  let clone = create2DArray(rows, cols);
  for (let i = 0; i < clone.length; i++) {
    for (let j = 0; j < clone[i].length; j++) {
      clone[i][j] = other[i][j];
    }
  }
  return clone;
}

function setup() {
  createCanvas(800, 800);
  cols = width / dim;
  rows = height / dim;
  grid = create2DArray(rows, cols);
  //frameRate(1);
}

function livingNeighbours(x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (x + i < cols && x + i >= 0 && y + j < rows && y + j >= 0) {
        sum += grid[x + i][y + j];
      }
    }
  }
  sum -= grid[x][y];
  return sum;
}

function draw() {
  background(0);

  newGeneration = create2DArray(rows, cols);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      n = livingNeighbours(i, j);

      if (n < 2 || n > 3) {
        newGeneration[i][j] = false;
      }
      if (n === 3 && !grid[i][j]) {
        newGeneration[i][j] = true;
      }
    }
  }

  grid = cloneArray(newGeneration);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j]) {
        fill(255);
        rect(i * dim, j * dim, dim, dim);
      }
    }
  }
}
