<script setup lang='ts'>
  import { onMounted } from 'vue'
  import { ConwaysCellsGame } from '../models/ConwaysCellsGame'

  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;

  let zoom: number = 50;
  let squareSize: number;

  let game: ConwaysCellsGame

  onMounted(() => {
    game = new ConwaysCellsGame()

    canvas = document.getElementById('conway-viewport') as HTMLCanvasElement;
    context = canvas.getContext('2d') as CanvasRenderingContext2D;

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas();
  });

  function drawBoard() {
    let cells = game.getLiveCells()
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.beginPath()
    cells.forEach(cell => {
      context.rect(cell.x * squareSize, cell.getY() * squareSize, squareSize, squareSize);
      context.fillStyle="white"
      context.fill()
    })
  }

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    squareSize = Math.floor(canvas.width / zoom)
    drawBoard()
  }

  function handleClick(event: MouseEvent) {
    console.log(event)
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

<style lang="css" scoped>
  #conway-viewport {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
  }
</style>
