<script setup>
const alerts = [
    { message: 'Ошибка создания изображения', bgColor: 'red', position: 'bottom-right' },
]

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
const imageName = ref(null)

const loading = ref(false)
const preview_element = ref(null)
const preview_scale = ref(2) // Важно, начальное значение = 2 (для десктопа)

const runtimeConfig = useRuntimeConfig()
const URL = runtimeConfig.public.apiUrl
const needCalculate = ref(false)

/* function correctedPromptString() {
    return imagePrompt.value.replaceAll(/\s/g, ' ').replaceAll('  ', ' ')
} */

async function onSubmit() {
    if (!imagePrompt.value) {
        promptInput.value.focus()
        return
    }

    loading.value = true

    try {
        const response = await $fetch(`${URL}/api/generator`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // prompt: correctedPromptString(),
                prompt: imagePrompt.value.trim(),
                style: imageStyle.value.value,
                width: imageWidth.value,
                height: imageHeight.value,
                // ...formData,
            }),
        })

        imageSrc.value = `${URL || 'https://api.rustamproject.ru/'}/${response.image_link}` // пихнуть в пользовательские данные на беке
        imageName.value = `${response.image_link.split('/').pop()}`
    }
    catch (error) {
        useNotification(alerts[0])
    }
    finally {
        loading.value = false
    }
}

function checkPreviewSize(rendered_width) {
    const width = imageWidth.value

    if (width > rendered_width)
        preview_scale.value = width / rendered_width
}

onMounted(() => {
    const rendered_width = preview_element.value.clientWidth

    if (rendered_width < (imageMaxSize / preview_scale.value)) {
        needCalculate.value = true
        checkPreviewSize(rendered_width)
    }
})
</script>

<template>
    <div class="flex flex-col items-center md:flex-row md:items-start w-full px-10">
        <q-form v-if="!imageSrc" class="mb-10 mr-10" @submit="onSubmit">
            <q-input
                ref="promptInput"
                v-model="imagePrompt"
                filled
                label="Промпт"
            />

            <q-select v-model="imageStyle" :options="imageStyleOptions" label="Стиль" class="mb-4" />

            <q-slider
                v-model="imageWidth"
                :min="0"
                :step="4"
                :max="1024"
                @update:model-value="needCalculate ? checkPreviewSize() : null"
            />

            <span class="block mb-4">Ширина: {{ imageWidth }}</span>

            <q-slider
                v-model="imageHeight"
                :min="0"
                :step="4"
                :max="1024"
            />

            <span class="block mb-4">Высота: {{ imageHeight }}</span>

            <q-btn label="Создать" type="submit" color="primary" :disabled="loading ? true : false" />
        </q-form>

        <div ref="preview_element" class="bg-gray flex items-center justify-center mx-auto max-w-full" :style="`height: ${imageHeight / preview_scale}px; width: ${imageWidth / preview_scale}px`">
            <span v-if="!loading && !imageSrc" class="text-xl text-darkgray">Предпросмотр</span>

            <q-img v-if="!loading && imageSrc" :src="imageSrc" fit="contain" class="max-h-full max-w-full" />

            <q-spinner
                v-if="loading && !imageSrc"
                color="primary"
                size="3em"
            />
        </div>
    </div>

    <div v-if="imageSrc" class="flex flex-col mt-5">
        <q-btn :download="imageName" :href="imageSrc" target="_blank" size="xl" label="Скачать" class="mb-5" />

        <q-btn target="_blank" size="xl" label="Создать ещё" @click="imageSrc = null" />
    </div>
</template>
