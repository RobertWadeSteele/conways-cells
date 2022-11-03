<script setup lang="ts">
const props = defineProps({
  tickFunction: Function,
  clearFunction: Function,
  updateDelayCallback: Function,
  isRunning: Boolean,
});

function updateDelay(event: Event) {
  props.updateDelayCallback!(event.target);
}
</script>

<template>
    <div class="control-container">
      <div class="control-panel">
        <button
        class="control"
        @click="props.tickFunction!()"
        :class="{ running: props.isRunning }"
        >
          Start
        </button>
        <button class="control" @click="props.clearFunction!()">Clear</button>
        <button class="control">Help</button>
        <input
          class="control-slider"
          type="range"
          min="4"
          max="500"
          value="250"
          @change="updateDelay($event)"
        />
        <output>{{ props.isRunning }}</output>
      </div>
    </div>
</template>

<style>
  .control-container {
    position: absolute;
    bottom: 5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    pointer-events: none;
  }
  
  .control-panel {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    background-color: rgb(50, 50, 50);
    opacity: 50%;
    transition: opacity 0.25s;
    pointer-events: all;
    padding: 1em 2em 1em 2em;
    border-radius: 15px;
  }

  .control-panel:hover {
    opacity: 100%;
    transition: opacity 0.25s;
  }

  .control-panel:hover .control {
    opacity: 100%;
  }

  .control {
    font-size: larger;
    border-style: none;
    padding: 15px;
    margin: 10px;
    opacity: 80%;
    border-radius: 10px;
  }
</style>
