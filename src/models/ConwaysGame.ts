export class ConwaysGame {
  cells: BinaryCellGrid;

  constructor() {
    // cells is a map of coordinates where the key is the x coordinate and the value is a set of y coordinates
    // a coordinate is represented
    this.cells = new BinaryCellGrid();
  }

  cellIsAlive(x: number, y: number): boolean {
    return this.cells.has(x, y);
  }

  toggleCell(x: number, y: number): void {
    if (this.cellIsAlive(x, y)) {
      this.cells.delete(x, y);
    } else {
      this.cells.add(x, y);
    }
  }

  getDeadNeighbors(x: number, y: number): BinaryCellGrid {
    const deadNeighborCells: BinaryCellGrid = new BinaryCellGrid();

    if (!this.cellIsAlive(x - 1, y)) {
      deadNeighborCells.add(x - 1, y);
    }
    if (!this.cellIsAlive(x + 1, y)) {
      deadNeighborCells.add(x + 1, y);
    }
    if (!this.cellIsAlive(x, y - 1)) {
      deadNeighborCells.add(x, y - 1);
    }
    if (!this.cellIsAlive(x, y + 1)) {
      deadNeighborCells.add(x, y + 1);
    }
    if (!this.cellIsAlive(x - 1, y - 1)) {
      deadNeighborCells.add(x - 1, y - 1);
    }
    if (!this.cellIsAlive(x + 1, y - 1)) {
      deadNeighborCells.add(x + 1, y - 1);
    }
    if (!this.cellIsAlive(x - 1, y + 1)) {
      deadNeighborCells.add(x - 1, y + 1);
    }
    if (!this.cellIsAlive(x + 1, y + 1)) {
      deadNeighborCells.add(x + 1, y + 1);
    }

    return deadNeighborCells;
  }

  gameTick(): void {
    const liveCells: BinaryCellGrid = new BinaryCellGrid();

    this.cells.forEach((x: number, y: number) => {
      const deadNeighbors = this.getDeadNeighbors(x, y);

      if (deadNeighbors.length == 6 || deadNeighbors.length == 5) {
        liveCells.add(x, y);
      }

      deadNeighbors.forEach((x: number, y: number) => {
        const temp = this.getDeadNeighbors(x, y);

        if (temp.length == 5) {
          liveCells.add(x, y);
        }
      });
    });

    this.cells = liveCells;
  }

  clear(): void {
    this.cells.clear();
  }
}

class BinaryCellGrid {
  cells: Map<number, Set<number>>;
  length: number;

  constructor() {
    this.cells = new Map();
    this.length = 0;
  }

  has(x: number, y: number): boolean {
    const y_coords = this.cells.get(x);
    return y_coords == undefined ? false : y_coords.has(y);
  }

  add(x: number, y: number): void {
    const y_coords = this.cells.get(x);
    if (y_coords == undefined) {
      const new_y_coords: Set<number> = new Set();
      new_y_coords.add(y);
      this.cells.set(x, new_y_coords);
    } else {
      y_coords.add(y);
    }
    this.length++;
  }

  delete(x: number, y: number): boolean {
    const y_coords = this.cells.get(x);

    if (y_coords == undefined || !y_coords.has(y)) {
      return false;
    }

    this.length--;

    if (y_coords!.size == 1) {
      this.cells.delete(x);
    } else {
      this.cells.get(x)!.delete(y);
    }

    return true;
  }

  forEach(callbackfn: (x: number, y: number) => void) {
    this.cells.forEach((y_coords: Set<number>, x: number) => {
      y_coords.forEach((y: number) => {
        callbackfn(x, y);
      });
    });
  }

  clear(): void {
    this.cells = new Map();
  }
}
