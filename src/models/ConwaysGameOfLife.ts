import { Coord2D } from "./Coord2D";

export class ConwaysGameOfLife {

    cells: Map<string, Coord2D>

    constructor() {
        this.cells = new Map<string, Coord2D>()
    }

    tick(): void {
        let liveCells: Map<string, Coord2D> = new Map<string, Coord2D>()
        
        this.cells.forEach((cell, key) => {
            let deadNeighbors = this.getDeadNeighbors(cell)
            if ( deadNeighbors.size == 5 || deadNeighbors.size == 6) {
                liveCells.set(key, cell)
            }
            deadNeighbors.forEach((cell, key) => {
                if ( this.getDeadNeighbors(cell).size == 5) {
                    liveCells.set(key, cell)
                }
            })
        })

        this.cells = liveCells
    }

    toggleCell(x: number, y: number): void {
        if (this.cellIsLive(x, y)) {
            this.killCell(x, y)
        } else {
            this.spawnCell(x, y)
        }
    }
    
    cellIsLive(x: number, y: number): boolean {
        return this.cells.has(new Coord2D(x, y).toKey())
    }

    spawnCell(x: number, y: number): void {
        let newCell: Coord2D = new Coord2D(x, y)
        this.cells.set(newCell.toKey(), newCell)
    }

    killCell(x: number, y: number): void {
        this.cells.delete(new Coord2D(x, y).toKey())
    }

    getDeadNeighbors(coord: Coord2D): Map<string, Coord2D> {
        let deadNeighbors = new Map<string, Coord2D>()
        for ( let x = coord.x - 1; x <= coord.x + 1; x++ ) {
            for ( let y = coord.y - 1; y <= coord.y + 1; y++ ) {
                if ( x != coord.x || y != coord.y ) {
                    let newCoord = new Coord2D(x, y)
                    let newCoordKey = newCoord.toKey()
                    if ( !this.cells.has(newCoordKey) ) {
                        deadNeighbors.set(newCoordKey, newCoord)
                    }
                }
            }
        }
        return deadNeighbors
    }
}