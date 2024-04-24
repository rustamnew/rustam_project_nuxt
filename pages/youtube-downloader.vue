<script setup>
useHead({
    title: 'Скачать видео',
})
definePageMeta({
    layout: 'default',
    name: 'Скачать видео',
    order: 2,
})
</script>

<template>
    <div class="disabled-block">
        <h3 class="text-h3 font-semibold mb-[0.55rem]">
            Скачать видео с YouTube
        </h3>
        <q-input label="URL" />
    </div>
</template>
