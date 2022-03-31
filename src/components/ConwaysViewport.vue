<script setup lang='ts'>
  import { onMounted, inject } from 'vue'
  import type { ConwaysGameOfLife } from '../models/ConwaysGameOfLife'
  
  import mitt from 'mitt'

  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;

  let zoom: number = 50;
  let squareSize: number;

  const game: ConwaysGameOfLife = inject('conwayGame') as ConwaysGameOfLife

  const emitter: any = inject('conwayEmitter')

  let isRunning: boolean = inject('isRunning')

  emitter.on('tick-once', (event: any) => {
    console.log('ticking once: ', event)
    tickOnce()
    
  })

  emitter.on('toggle-run', (event: any) => {
    console.log('running: ', event)
    isRunning = !isRunning
    if (isRunning) {
      runLoop()
    }
  })

  function runLoop() {
    tickOnce()
    setTimeout(() => {
      if (isRunning) {
        runLoop()
        }
    }, 250)
  }

  function tickOnce() {
    game.tick()
    drawBoard()
  }

  onMounted(() => {
    canvas = document.getElementById('conway-viewport') as HTMLCanvasElement;
    context = canvas.getContext('2d') as CanvasRenderingContext2D;

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas();
  })

  function drawBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.beginPath()
    game.cells.forEach(cell => {
      context.rect(cell.x * squareSize, cell.y * squareSize, squareSize, squareSize);
      context.fillStyle="white"
      context.fill()
    })
    console.log('drawn')
  }

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    squareSize = Math.floor(canvas.width / zoom)
    drawBoard()
  }

  function handleClick(event: MouseEvent) {
    const rect = canvas.getBoundingClientRect()
    let x = Math.floor((event.clientX - rect.left) / squareSize)
    let y = Math.floor((event.clientY - rect.top) / squareSize)
    game.toggleCell(x, y)
    drawBoard()
  }
</script>

<template>
  <canvas id="conway-viewport" @click="handleClick($event)"></canvas>
</template>

<style>
  #conway-viewport {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
  }
</style>
