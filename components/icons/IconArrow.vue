<!--
Компонент - Иконка меню.
Можно назначить направление стрелки через проп direction (left / right / up / down).

-->

<script setup>
const props = defineProps({
    direction: String,
})

const svgStyle = ref(null)

function checkProp() {
    switch (props.direction) {
        case 'left':
            svgStyle.value = 'transform: rotate(90deg);'
            break

        case 'right':
            svgStyle.value = 'transform: rotate(-90deg);'
            break

        case 'up':
            svgStyle.value = 'transform: rotate(180deg);'
            break

        case 'down':
        default:
            svgStyle.value = 'transform: rotate(0deg);'
            break
    }
}

onUpdated(() => {
    checkProp()
})

checkProp()
</script>

<template>
    <svg
        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" :style="svgStyle"
    >
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.11997 9.29L12 13.17L15.88 9.29C16.27 8.9 16.9 8.9 17.29 9.29C17.68 9.68 17.68 10.31 17.29 10.7L12.7 15.29C12.31 15.68 11.68 15.68 11.29 15.29L6.69997 10.7C6.30997 10.31 6.30997 9.68 6.69997 9.29C7.08997 8.91 7.72997 8.9 8.11997 9.29Z" fill="#0F0F0F" />
    </svg>
</template>
