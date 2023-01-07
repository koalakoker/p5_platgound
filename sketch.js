const topCell = 0;
const rigthCell = 1;
const bottomCell = 2;
const leftCell = 3;

function Index(i, j) {
  if (i < 0 || i >= cols || j < 0 || j >= rows) {
    return -1;
  } else {
    return i + j * cols;
  }
}

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;
  }
  draw() {
    stroke(255);
    if (this.walls[topCell]) {
      line(
        this.i * sizeCell,
        this.j * sizeCell,
        (this.i + 1) * sizeCell,
        this.j * sizeCell
      );
    }
    if (this.walls[rigthCell]) {
      line(
        (this.i + 1) * sizeCell,
        this.j * sizeCell,
        (this.i + 1) * sizeCell,
        (this.j + 1) * sizeCell
      );
    }
    if (this.walls[bottomCell]) {
      line(
        this.i * sizeCell,
        (this.j + 1) * sizeCell,
        (this.i + 1) * sizeCell,
        (this.j + 1) * sizeCell
      );
    }
    if (this.walls[leftCell]) {
      line(
        this.i * sizeCell,
        this.j * sizeCell,
        this.i * sizeCell,
        (this.j + 1) * sizeCell
      );
    }
    if (this.visited) {
      noStroke();
      fill(0, 200, 0, 100);
      rect(this.i * sizeCell, this.j * sizeCell, sizeCell, sizeCell);
    }
    if (this === current) {
      noStroke();
      fill(200, 0, 200, 100);
      rect(this.i * sizeCell, this.j * sizeCell, sizeCell, sizeCell);
    }
  }
  checkNeigbours() {
    let neigbours = [];
    let topN = cells[Index(this.i, this.j - 1)];
    if (topN && !topN.visited) {
      neigbours.push(topN);
    }
    let rigthN = cells[Index(this.i + 1, this.j)];
    if (rigthN && !rigthN.visited) {
      neigbours.push(rigthN);
    }
    let bottomN = cells[Index(this.i, this.j + 1)];
    if (bottomN && !bottomN.visited) {
      neigbours.push(bottomN);
    }
    let leftN = cells[Index(this.i - 1, this.j)];
    if (leftN && !leftN.visited) {
      neigbours.push(leftN);
    }
    return neigbours;
  }
}

let cells = [];
let sizeCell = 40;
let cols;
let rows;

let current;

function setup() {
  createCanvas(400, 400);
  cols = width / sizeCell;
  rows = height / sizeCell;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      cells[Index(i, j)] = new Cell(i, j);
    }
  }
  current = cells[0];
}

function removeWalls(current, nextCell) {
  if (nextCell.j - current.j === -1) {
    // next top
    current.walls[topCell] = false;
    nextCell.walls[bottomCell] = false;
  }

  if (nextCell.i - current.i === 1) {
    // next right
    current.walls[rigthCell] = false;
    nextCell.walls[leftCell] = false;
  }

  if (nextCell.j - current.j === 1) {
    // next bottom
    current.walls[bottomCell] = false;
    nextCell.walls[topCell] = false;
  }

  if (nextCell.i - current.i === -1) {
    // next left
    current.walls[leftCell] = false;
    nextCell.walls[rigthCell] = false;
  }
}

function draw() {
  background(0);

  current.visited = true;
  let neigbs = current.checkNeigbours();

  if (neigbs.length > 0) {
    let nextCell = neigbs[floor(random(neigbs.length))];
    // Remove walls between current and nextCell
    removeWalls(current, nextCell);
    current = nextCell;
  }

  cells.forEach((cell) => {
    cell.draw();
  });

  //noLoop();
}
