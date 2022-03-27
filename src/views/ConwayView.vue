<script setup lang="ts">
  import ConwayViewport from '@/components/ConwayViewport.vue'
</script>

<template>
  <div class="conway-cells">
      <ConwayViewport></ConwayViewport>
  </div>
</template>

<style>
.conway-cells {
  border: 1px solid red;
  width: 50%;
  padding: 50%;
  box-sizing: border-box;
}
/* @media (min-width: 1024px) {
  .conway-cells {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
