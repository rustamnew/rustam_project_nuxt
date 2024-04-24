<script setup>
    defineProps({
        size: String,
        color: String
    })
</script>

<template>
    <svg :width="size ? size : '1rem'" :height="size ? size : '1rem'" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12.6111L8.92308 17.5L20 6.5" :stroke="color ? color : '#ffffff'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</template>
