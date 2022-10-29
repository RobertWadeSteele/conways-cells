<script setup lang='ts'>
    const props = defineProps({
        tickFunction: Function,
        clearFunction: Function,
    })
</script>

<template>
    <div class="control-panel">
        <div class="button-container">
            <button class="control" @click="props.tickFunction!()">Tick</button>
            <button class="control" @click="props.clearFunction!()">Clear</button>
            <button class="control">Help</button>
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
        left: 0px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
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