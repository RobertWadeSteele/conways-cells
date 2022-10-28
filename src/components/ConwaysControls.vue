<script setup lang='ts'>
    const props = defineProps({
        tickFunction: Function
    })
</script>

<template>
    <div class="control-panel">
        <div>
            <button class="control" @click="props.tickFunction!()">Tick</button>
        </div>
    </div>
</template>

<style>
    .control-panel {
        position: absolute;
        top: 10px;
        left: 10px;
    }
</style>