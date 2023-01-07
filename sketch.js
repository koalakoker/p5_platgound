const topCell = 0;
const rigthCell = 1;
const bottomCell = 2;
const leftCell = 3;

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
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
    //rect(this.i * sizeCell, this.j * sizeCell, sizeCell, sizeCell);
  }
}

let cells = [];
let sizeCell = 40;
let cols;
let rows;

function setup() {
  createCanvas(400, 400);
  cols = width / sizeCell;
  rows = height / sizeCell;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let index = i + j * cols;
      cells[index] = new Cell(i, j);
    }
  }
}

function draw() {
  background(0);
  cells.forEach((cell) => {
    cell.draw();
  });
}
