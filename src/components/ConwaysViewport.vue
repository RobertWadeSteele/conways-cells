<script setup lang='ts'>
  import { onMounted, inject } from 'vue'
  import { ConwaysGame } from '@/models/ConwaysGame'
  import ConwaysControls from '@/components/ConwaysControls.vue'
  import { Cell } from '@/models/Cell';
  
  let canvas: HTMLCanvasElement
  let context: CanvasRenderingContext2D
  let game: ConwaysGame = new ConwaysGame()
  let squareSize: number = 20

  // initialize the conway canvas
  onMounted(() => {
    canvas = document.getElementById('conway-canvas') as HTMLCanvasElement
    context = canvas.getContext("2d")!
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    resize_canvases_observer.observe(canvas)
    drawBoard()
  })

  function drawBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.beginPath()
    context.fillStyle = "white"
    context.strokeStyle = "dimgray"

    // draw vertical guidelines
    for (let x = 0; x < canvas.width; x += squareSize) {
      context.moveTo(x, 0)
      context.lineTo(x, canvas.height)
      context.stroke()
    }

    // draw horizontal guidelines
    for (let y = 0; y < canvas.height; y += squareSize) {
      context.moveTo(0, y)
      context.lineTo(canvas.width, y)
      context.stroke()
    }

    // draw all cells on grid
    // TODO: find some way to limit cells to only search within visible region
    game.cells.forEach((cell: Cell) => {
      context.fillRect(cell.x * squareSize, cell.y * squareSize, squareSize, squareSize)
    })
  }

  const resize_canvases_observer = new ResizeObserver((entries) => {
    for (let entry of entries) {
      let canvas: HTMLCanvasElement = entry.target as HTMLCanvasElement
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    drawBoard()
  })
  
  function tick() {
    game.gameTick()
    drawBoard()
  }

  function handleClick(event: MouseEvent) {
    let cell_x = (event.x - (event.x % squareSize)) / squareSize
    let cell_y = (event.y - (event.y % squareSize)) / squareSize
    // let x = event.x - (event.x % squareSize)
    // let y = event.y - (event.y % squareSize)
    
    game.toggleCell(new Cell(cell_x, cell_y))

    drawBoard()
  }

  function handleScroll(event: WheelEvent) {
    squareSize = squareSize - event.deltaY % (0.2 * squareSize)
    drawBoard()
  }
</script>

<template>
  <canvas id="conway-canvas" @click="handleClick($event)" @wheel="handleScroll($event)"></canvas>
  <ConwaysControls :tick-function='tick'></ConwaysControls>
</template>

<style>
  #conway-canvas {
    width: 100%;
    height: 100%;
  }
</style>
