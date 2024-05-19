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

const generations = ref(await useData('generations', 'get'))

async function updateGallery() {
    generations.value = await useData('generations', 'get')
}
</script>

<template>
    <ImageGenerator @created="updateGallery()" />
    <ImageGallery class-name="mt-10" :items="generations" />
</template>
