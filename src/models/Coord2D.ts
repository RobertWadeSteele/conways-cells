export class Coord2D {

  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  toKey(): string {
    return `(${this.x}, ${this.y})`
  }
}