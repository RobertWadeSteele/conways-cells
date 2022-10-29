export class ConwaysGame {
    cells: BinaryCellGrid

    constructor() {
        // cells is a map of coordinates where the key is the x coordinate and the value is a set of y coordinates
        // a coordinate is represented 
        this.cells = new BinaryCellGrid()
    }

    
    cellIsAlive(x: number, y: number): boolean {
        return this.cells.has(x, y)
    }

    toggleCell(x: number, y: number): void {
        if (this.cellIsAlive(x, y)) {
            this.cells.delete(x, y)
        } else {
            this.cells.add(x, y)
        }
    }

    getDeadNeighbors(x: number, y: number): BinaryCellGrid {
        let deadNeighborCells: BinaryCellGrid = new BinaryCellGrid()

        if (!this.cellIsAlive(x - 1, y)) {
            deadNeighborCells.add(x - 1, y)
        }
        if (!this.cellIsAlive(x + 1, y)) {
            deadNeighborCells.add(x + 1, y)
        }
        if (!this.cellIsAlive(x, y - 1)) {
            deadNeighborCells.add(x, y - 1)
        }
        if (!this.cellIsAlive(x, y + 1)) {
            deadNeighborCells.add(x, y + 1)
        }
        if (!this.cellIsAlive(x - 1, y - 1)) {
            deadNeighborCells.add(x - 1, y - 1)
        }
        if (!this.cellIsAlive(x + 1, y - 1)) {
            deadNeighborCells.add(x + 1, y - 1)
        }
        if (!this.cellIsAlive(x - 1, y + 1)) {
            deadNeighborCells.add(x - 1, y + 1)
        }
        if (!this.cellIsAlive(x + 1, y + 1)) {
            deadNeighborCells.add(x + 1, y + 1)
        }
        
        return deadNeighborCells
    }


    gameTick(): void {
        let liveCells: BinaryCellGrid = new BinaryCellGrid()
        
        this.cells.forEach((x: number, y: number) => {
            let deadNeighbors = this.getDeadNeighbors(x, y)
            
            if (deadNeighbors.length == 6 || deadNeighbors.length == 5) {
                liveCells.add(x, y)
            } else {
                console.log(deadNeighbors.length)
            }

            deadNeighbors.forEach((x: number, y: number) => {
                let temp = this.getDeadNeighbors(x, y)

                if (temp.length == 5) {
                    liveCells.add(x, y)
                }
            })
        })

        // this.cells.forEach((y_coords: Set<number>, x: number) => {
        //     y_coords.forEach((y: number) => {
        //         let deadNeighbors = this.getDeadNeighbors(x, y)

        //         if (deadNeighbors.length == 6 || deadNeighbors.length == 5) {
        //             if (liveCells.has(x)) {
        //                 liveCells.get(x)!.add(y)
        //             } else {
        //                 let new_set: Set<number> = new Set()
        //                 new_set.add(y)
        //                 liveCells.set(x, new_set)
        //             }
        //         }

        //         deadNeighbors.forEach((cell: Cell) => {
        //             if (!liveCells.has(cell) && this.getDeadNeighbors(cell).length == 5) {
        //                 liveCells.add(cell)
        //             }
        //         })
        //     })
        // })

        this.cells = liveCells
    }
}

class BinaryCellGrid {
    cells: Map<number, Set<number>>
    length: number

    constructor() {
        this.cells = new Map()
        this.length = 0
    }

    has(x: number, y: number): boolean {
        let y_coords = this.cells.get(x)
        return (y_coords == undefined) ? false : y_coords.has(y)
    }

    add(x: number, y: number): void {
        let y_coords = this.cells.get(x)
        if (y_coords == undefined) {
            let new_y_coords: Set<number> = new Set()
            new_y_coords.add(y)
            this.cells.set(x, new_y_coords)
        } else {
            y_coords.add(y)
        }
        this.length++
    }

    delete(x: number, y: number): boolean {
        let y_coords = this.cells.get(x)

        if (y_coords == undefined || !y_coords.has(y)) {
            return false
        }

        this.length--

        if (y_coords!.size == 1) {
            this.cells.delete(x)
        } else {
            this.cells.get(x)!.delete(y)
        }

        return true
    }   

    forEach(callbackfn: (x: number, y: number) => void) {
        this.cells.forEach((y_coords: Set<number>, x: number) => { 
            y_coords.forEach((y: number) => {
                callbackfn(x, y)
            })
        })
    }
}