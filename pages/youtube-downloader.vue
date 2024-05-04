<script setup>
useHead({
    title: 'Скачать видео',
})
definePageMeta({
    layout: 'default',
    name: 'Скачать видео',
    order: 2,
    globalMenu: false,
})

const formatOptions = [
    '360p',
    '4800p',
    '720p',
    '1080p',
]

const format = ref(null)
</script>

<template>
    <div class="disabled-block">
        <h3 class="text-h3 font-semibold mb-[0.55rem]">
            Скачать видео с YouTube
        </h3>
        <q-input label="URL" />

        <q-select v-model="format" :options="formatOptions" label="Формат" class="mb-4" />

        <q-btn color="primary" label="Скачать" class="mb-5" />
    </div>
</template>
