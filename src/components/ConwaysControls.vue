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
  <div class="control-panel">
    <div class="button-container">
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
.control {
  font-size: larger;
  border-style: none;
  padding: 15px;
  margin: 10px;
  opacity: 80%;
  border-radius: 10px;
}

    .control-panel {
        position: absolute;
        bottom: 5vh;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        /* display: flex;
        align-items: center;
        justify-content: center; */
        /* background-color: green; */
    }

.button-container {
  /* width: 100%; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
  border-radius: 15px;
  background-color: rgb(50, 50, 50);
  opacity: 50%;
  transition: opacity 0.25s;
  -webkit-backface-visibility: hidden;
}

.button-container:hover {
  opacity: 100%;
  transition: opacity 0.25s;
}

.button-container:hover .control {
  opacity: 100%;
}
</style>
