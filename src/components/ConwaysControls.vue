<script setup lang='ts'>
    import { inject } from 'vue'
    import mitt from 'mitt'

    const emitter: any = inject('conwayEmitter')

    let isRunning = inject('isRunning')

    function tickOnce(event: any) {
        emitter.emit('tick-once', event)
    }

    function toggleRun(event: any) {
        emitter.emit('toggle-run', event)
    }
</script>

<template>
    <button id="tick-once"
            :class="isRunning ? 'stop' : 'run'"
            @click="tickOnce($event)">
            Tick Once</button>
    <button id="toggle-run" @click="toggleRun($event)">Toggle Run</button>
</template>

<style scoped>
    button.stop {
        border-style: solid;
        background-color: red;
    }
</style>