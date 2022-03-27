import { Coord2D } from "./Coord2D";

export class ConwaysCellsGame {

    cells: Map<number, Set<number>>

    constructor() {
        this.cells = new Map<number, Set<number>>()
    }

    step(): void {
        let cellsChecked = new Set<string>()

        let iter = this.cells.values()

        while(true) {
            let currIteration = iter.next()
            if (currIteration.done) {
                break
            }
            let currCell: Coord2D = currIteration.value
            for (let neighborCell in currCell.getNeighbors()) {
                let neighborKey = neighborCell.toString()
                if (this.cells.has(neighborKey) || 
                    cellsChecked.has(neighborKey)) {
                        continue
                }
                cellsChecked.add(neighborKey)
                this.addCell(currCell)
            }  
        }
    }

    toggleCell(x: number, y: number): void {
        if (this.cells.get(x)?.has(y)) {
            this.removeCell(x, y)
          } else {
            this.addCell(x, y)
          }
    }

    addCell(x: number, y: number): void {
        if (this.cells.has(x)) {
            this.cells.get(x)?.add(y)
        } else {
            let newSet: Set<number> = new Set()
            newSet.add(y)
            this.cells.set(x, newSet)
        }
    }

    removeCell(x: number, y: number): void {
        if (this.cells.get(x).size < 2) {
            this.cells.
        }
    }

    getLiveCells(): Set<Coord2D> {
        return new Set<Coord2D>()
    }
}