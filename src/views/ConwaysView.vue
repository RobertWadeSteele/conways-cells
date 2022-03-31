<script setup lang="ts"> 
  // Component Imports
  import ConwaysViewport from '@/components/ConwaysViewport.vue'
  import ConwaysControls from '@/components/ConwaysControls.vue'

  // Service Imports
  import mitt from 'mitt'
  import { provide } from 'vue'

  // Model Imports
  import { ConwaysGameOfLife } from '../models/ConwaysGameOfLife'

  const game = new ConwaysGameOfLife()
  const emitter = mitt()

  let isRunning: boolean = false

  provide('conwayGame', game)
  provide('conwayEmitter', emitter)
  provide('isRunning', isRunning)
</script>

<template>
  <main>
    <div class="square-wrapper">
      <ConwaysViewport></ConwaysViewport>
    </div>
    <ConwaysControls />
  </main>
</template>

<style>
.square-wrapper {
  border: 1px solid red;
  width: 50%;
  padding: 50%;
  box-sizing: border-box;
}
</style>