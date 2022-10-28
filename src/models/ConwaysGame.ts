export class ConwaysGame {
    cells: Map<number, Set<number>>

    constructor() {
        // cells is a map of coordinates where the key is the x coordinate and the value is a set of y coordinates
        // a coordinate is represented 
        this.cells = new Map()
    }

    
    cellIsAlive(x_coord: number, y_coord: number): boolean {
        let y_coordinates = this.cells.get(x_coord)
        return y_coordinates == undefined ? false : y_coordinates!.has(y_coord)
    }

    // toggle cell dead/alive at (x, y)
    toggleCell(x: number, y: number): void {
        // get all live cells with an x coordinate that matches input x
        let y_coordinates = this.cells.get(x)

        // no cell at x coordinate exists so we define a coordinate at (x, y)
        if (y_coordinates == undefined) {
            let new_y_coordinates = new Set<number>()
            new_y_coordinates.add(y)
            this.cells.set(x, new_y_coordinates)
        }

        // cells exist at x coordinate so we check if a cell matching (x, y) exists
        else {
            // a cell matching (x, y) exists so we will delete it
            if (y_coordinates!.has(y)) {
                // there is only one cell at coordinate x so we will delete map entry to x to save space
                // TODO: decide if this is necessary
                if (y_coordinates!.size == 1) {
                    this.cells.delete(x)
                }
                // we remove the cell at coordinate (x, y)
                else {
                    y_coordinates!.delete(y)
                }
            }
            // a cell does not exist at (x, y) so we define a coordinate at (x, y)
            else {
                y_coordinates!.add(y)
            }
        }
    }

    getDeadNeighbors(x_coord: number, y_coord: number) {
        let count = 0
        if (this.cellIsAlive(x_coord - 1, y_coord)) { count++ }
        if (this.cellIsAlive(x_coord + 1, y_coord)) { count++ }
        if (this.cellIsAlive(x_coord, y_coord - 1)) { count++ }
        if (this.cellIsAlive(x_coord, y_coord + 1)) { count++ }
        if (this.cellIsAlive(x_coord - 1, y_coord - 1)) { count++ }
        if (this.cellIsAlive(x_coord + 1, y_coord - 1)) { count ++ }
        if (this.cellIsAlive(x_coord - 1, y_coord + 1)) { count++ }
        if (this.cellIsAlive(x_coord + 1, y_coord + 1)) { count++ }
        return count
    }

    gameTick() {
        let liveCells: Map<number, Set<number>> = new Map()

        this.cells.forEach((y_coords: Set<number>, x: number) => {
            y_coords.forEach((y: number) => {
                if (this.cellIsAliveNextTick(x, y)) {

                }
            })
        })
    }

    cellIsAliveNextTick(x_coord: number, y_coord: number): boolean {
        return true
    }
}