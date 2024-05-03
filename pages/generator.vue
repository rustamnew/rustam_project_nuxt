<script setup>
useHead({
    title: 'Генератор изображений',
})
definePageMeta({
    layout: 'default',
    name: 'Генератор изображений',
    middleware: 'auth',
    order: 3,
})
</script>

<template>
    <ImageGenerator />
</template>
