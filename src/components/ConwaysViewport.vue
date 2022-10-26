<script setup lang='ts'>
  import { onMounted, inject } from 'vue'
  import { ConwaysGameOfLife } from '../models/ConwaysGameOfLife'
  
  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;

  let squareSize: number;

  let game: ConwaysGameOfLife = new ConwaysGameOfLife()

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
  }
</style>
