<script setup>
defineProps({
    className: String,
    items: Array,
})

const runtimeConfig = useRuntimeConfig()
const URL = `${runtimeConfig.public.apiUrl}/data/generations/`

// Анимация загрузки пока не отрисовались карточки
const loaded = ref(false)
onMounted(() => {
    loaded.value = true
})
</script>

<template>
    <div class="w-full flex flex-col items-center" :class="className">
        <!-- Убарть класс text-h3 из tailwind конфига, он перекрывает quasar'овский -->
        <h3 v-if="items && items.length" class="text-h3 mb-4">
            Галерея
        </h3>

        <div class="flex items-center justify-center w-full px-10">
            <q-card v-for="item, index in items" :key="index" class="m-4">
                <a :href="URL + item" target="_blank">
                    <q-img :src="URL + item" :alt="item" class="w-[120px] h-[120px]" />
                </a>
            </q-card>
        </div>

        <q-spinner
            v-if="!loaded"
            class="mt-10"
            color="primary"
            size="3em"
        />
    </div>
</template>
