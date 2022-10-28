<script setup lang='ts'>
  import { onMounted, inject } from 'vue'
  import { ConwaysGame } from '@/models/ConwaysGame'
  
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
    for (let x = 0; x < canvas.offsetWidth; x += squareSize) {
      context.moveTo(x, 0)
      context.lineTo(x, canvas.offsetHeight)
      context.stroke()
    }
    // draw horizontal guidelines
    for (let y = 0; y < canvas.offsetHeight; y += squareSize) {
      context.moveTo(0, y)
      context.lineTo(canvas.offsetWidth, y)
      context.stroke()
    }
    game.cells.forEach((y_coords: Set<number>, x_coord: number) => {
      y_coords.forEach((y_coord: number) => {
        context.fillRect(x_coord, y_coord, squareSize, squareSize)
      })
    })
    console.log('drawn')
  }

  // observer to 
  const resize_canvases_observer = new ResizeObserver((entries) => {
    for (let entry of entries) {
      let canvas: HTMLCanvasElement = entry.target as HTMLCanvasElement
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      console.log('Resized canvas...')
    }
    drawBoard()
  })
  

  function handleClick(event: MouseEvent) {
    let x = event.x - (event.x % squareSize)
    let y = event.y - (event.y % squareSize)
    
    game.toggleCell(event.x - (event.x % squareSize),
                    event.y - (event.y % squareSize))

    drawBoard()
  }
</script>

<template>
  <canvas id="conway-canvas" @click="handleClick($event)"></canvas>
</template>

<style>
  #conway-canvas {
    width: 100%;
    height: 100%;
  }
</style>
