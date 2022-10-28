import { Cell } from '@/models/Cell'
export class ConwaysGame {
    cells: Set<Cell>

    constructor() {
        // cells is a map of coordinates where the key is the x coordinate and the value is a set of y coordinates
        // a coordinate is represented 
        this.cells = new Set()
    }

    
    cellIsAlive(cell: Cell): boolean {
        return this.cells.has(cell)
    }

    toggleCell(cell: Cell): void {
        if (this.cellIsAlive(cell)) {
            this.cells.delete(cell)
        } else {
            this.cells.add(cell)
        }
    }

    getDeadNeighbors(cell: Cell): Cell[] {
        let x = cell.x, y = cell.y
        let deadNeighborCells: Cell[] = []
        let temp: Cell

        temp = new Cell(x - 1, y)
        if (!this.cellIsAlive(temp)) { deadNeighborCells.push(temp) }
        temp = new Cell(x + 1, y)
        if (!this.cellIsAlive(temp)) { deadNeighborCells.push(temp) }
        temp = new Cell(x, y - 1) 
        if (!this.cellIsAlive(temp)) { deadNeighborCells.push(temp) }
        temp = new Cell(x, y + 1)
        if (!this.cellIsAlive(temp)) { deadNeighborCells.push(temp) }
        temp = new Cell(x - 1, y - 1)
        if (!this.cellIsAlive(temp)) { deadNeighborCells.push(temp) }
        temp = new Cell(x - 1, y + 1)
        if (!this.cellIsAlive(temp)) { deadNeighborCells.push(temp) }
        temp = new Cell(x + 1, y - 1)
        if (!this.cellIsAlive(temp)) { deadNeighborCells.push(temp) }
        temp = new Cell(x + 1, y + 1)
        if (!this.cellIsAlive(temp)) { deadNeighborCells.push(temp) }
        
        return deadNeighborCells
    }


    gameTick() {
        console.log('tick')
        let liveCells: Set<Cell> = new Set()

        this.cells.forEach((cell: Cell) => {
            let deadNeighbors = this.getDeadNeighbors(cell)
            if (deadNeighbors.length == 6 || deadNeighbors.length == 5) {
                liveCells.add(cell)
            }
            deadNeighbors.forEach((cell: Cell) => {
                if (!liveCells.has(cell) && this.getDeadNeighbors(cell).length == 5) {
                    liveCells.add(cell)
                }
            })
        })

        console.log(this.cells)
        console.log(liveCells)

        this.cells = liveCells
    }
}