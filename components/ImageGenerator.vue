<script setup>
import { Loading } from 'quasar'

const imageStyleOptions = [
    {
        label: 'По умолчанию',
        value: '0',
    },
    {
        label: 'KANDINSKY',
        value: '1',
    },
    {
        label: 'UHD',
        value: '2',
    },
    {
        label: 'ANIME',
        value: '3',
    },
]
const imageMaxSize = 1024

const promptInput = ref(null)
const imagePrompt = ref(null)
const imageStyle = ref(imageStyleOptions[0])
const imageWidth = ref(imageMaxSize)
const imageHeight = ref(imageMaxSize)

const imageSrc = ref(null)

const loading = ref(false)

async function onSubmit() {
    if (!imagePrompt.value) {
        promptInput.value.focus()
        return
    }

    loading.value = true
    const response = await $fetch('http://localhost:3001/api/generator', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: imagePrompt.value,
            style: imageStyle.value.value,
            width: imageWidth.value,
            height: imageHeight.value,
            // ...formData,
        }),
    })

    loading.value = false

    imageSrc.value = `http://localhost:3001/${response.image_link}` // пихнуть в пользовательские данные в сторе в галерею
}
</script>

<template>
    <div class="flex flex-col items-center md:flex-row md:items-start w-full px-10">
        <q-form v-if="!imageSrc" class="mb-10 mr-10" @submit="onSubmit">
            <q-input
                ref="promptInput"
                v-model="imagePrompt"
                filled
                type="textarea"
                label="Промпт"
            />

            <q-select v-model="imageStyle" :options="imageStyleOptions" label="Стиль" class="mb-4" />

            <q-slider
                v-model="imageWidth"
                :min="0"
                :step="4"
                :max="1024"
            />

            <span class="block mb-4">Ширина: {{ imageWidth }}</span>

            <q-slider
                v-model="imageHeight"
                :min="0"
                :step="4"
                :max="1024"
            />

            <span class="block mb-4">Высота: {{ imageHeight }}</span>

            <q-btn label="Отправить" type="submit" color="primary" />
        </q-form>

        <div class="bg-gray flex items-center justify-center mx-auto" :style="`height: ${imageHeight / 2}px; width: ${imageWidth / 2}px`">
            <span v-if="!loading && !imageSrc" class="text-xl text-darkgray">Предпросмотр</span>

            <q-img v-if="!loading && imageSrc" :src="imageSrc" fit="contain" class="max-h-full max-w-full" />
        </div>
    </div>

    <div v-if="imageSrc" class="flex flex-col mt-5">
        <q-btn :href="imageSrc" target="_blank" size="xl" label="Скачать" class="mb-5" />

        <q-btn :href="imageSrc" target="_blank" size="xl" label="Создать ещё" />
    </div>
</template>
