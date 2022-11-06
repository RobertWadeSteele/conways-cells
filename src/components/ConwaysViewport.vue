<script setup lang="ts">
  import { onMounted, toRef, type Ref } from "vue";
  import { ConwaysGame } from "@/models/ConwaysGame";
  import ConwaysControls from "@/components/ConwaysControls.vue";

  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;
  let game: ConwaysGame = new ConwaysGame();
  let squareSize = 20;
  let running: boolean = false;
  let timeoutID = 0;
  let delay = 250;
  let x_offset = 0;
  let y_offset = 0;

  // -------------------------- Init ------------------------- //
  // initialize the conway canvas
  onMounted(() => {
    canvas = document.getElementById("conway-canvas") as HTMLCanvasElement;
    context = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    resize_canvases_observer.observe(canvas);
    drawBoard();
  });

  // ------------------------- Render -------------------------//
  // draw the board
  function drawBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.fillStyle = "white";

    // draw each cell
    // TODO: limit drawing to visible space
    game.cells.forEach((x: number, y: number) => {
      context.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
    });

    // draw vertical guidelines
    for (let x = 0; x < canvas.width; x += squareSize) {
      context.moveTo(x, 0);
      context.lineTo(x, canvas.height);
    }

    // draw horizontal guidelines
    for (let y = 0; y < canvas.height; y += squareSize) {
      context.moveTo(0, y)
      context.lineTo(canvas.width, y)
    }

    context.strokeStyle = 'rgba(80, 80, 80, 1)'
    context.stroke()
  }

  // ----------------------- Observers ---------------------------- //
  // watches to ensure the canvas used to draw the game maintains its resolution
  const resize_canvases_observer = new ResizeObserver((entries) => {
    for (let entry of entries) {
      let canvas: HTMLCanvasElement = entry.target as HTMLCanvasElement;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    drawBoard();
  });

  // ----------------------- Game Functions ---------------------------//
  // a function to advance the game by one tick and redraw the board
  function tick() {
    game.gameTick();
    drawBoard();
  }

  // clear all cells from board
  function clearBoard() {
    if (running) {
      stop();
    }
    game.clear();
    drawBoard();
  }

  // ----------------------- Runtime ------------------------ //
  function toggleRun() {
    if (running) {
      stop();
    } else {
      start();
    }
  }

  function start() {
    tick();
    running = true;
    run();
  }

  function stop() {
    running = false;
    clearTimeout(timeoutID);
  }

  function run() {
    if (running) {
      timeoutID = setTimeout(() => {
        tick();
        run();
      }, delay);
    }
  }

  // -------------------------- DOM Events ---------------------//
  function handleClick(event: MouseEvent) {
    if (running == true) {
      return;
    }
    let x = (event.x - (event.x % squareSize)) / squareSize;
    let y = (event.y - (event.y % squareSize)) / squareSize;

    game.toggleCell(x, y);

    drawBoard();
  }

  function handleScroll(event: WheelEvent) {
    squareSize = squareSize - (event.deltaY % (0.2 * squareSize));
    drawBoard();
  }

  function updateDelay(input: HTMLInputElement) {
    delay = parseInt(input.value);
    if (running) {
      stop();
      start();
    }
  }

  function toggle() {
    running = !running;
    console.log(running);
  }
</script>

<template>
  <canvas
    id="conway-canvas"
    @mousedown="handleClick($event)"
    @wheel="handleScroll($event)"
  ></canvas>
  <ConwaysControls
    :toggle-run="toggleRun"
    :clear-function="clearBoard"
    :update-delay-callback="updateDelay"
    :is-running="running"
  ></ConwaysControls>
</template>

<style>
#conway-canvas {
  width: 100%;
  height: 100%;
}
</style>
