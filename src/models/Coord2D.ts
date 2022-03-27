export class Coord2D {

  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  neighbors(): Coord2D[] {
    return []
  }
}