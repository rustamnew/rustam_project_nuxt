<script setup>
import IconArrow from '~/components/icons/IconArrow.vue'

const _props = defineProps({
    item: Object,
})

const expanded = ref(false)
</script>

<template>
    <div class="flex flex-col sm:flex-row items-center flex-nowrap sm:mb-3 last:mb-0 rounded-2xl overflow-hidden" :style="item.bg_color ? `background-color: ${item.bg_color};` : ''">
        <div class="flex flex-col w-full p-5">
            <h3 class="text-h3_mobile sm:text-h3 font-semibold flex justify-beetween relative w-full mb-2 pr-6">
                {{ item.title }}

                <button v-if="item.expanded_text" class="absolute top-2 right-0" @click="expanded = !expanded">
                    <IconArrow :direction="expanded ? 'up' : 'down'" />
                </button>
            </h3>

            <p class="text-base sm:text-lg sm:leading-7" :class="item.text_color ? `text-${item.text_color}` : ''">
                {{ item.text }}
            </p>

            <p v-if="item.expanded_text" v-show="expanded" class="text-lg leading-7" :class="item.text_color ? `text-${item.text_color}` : ''">
                {{ item.expanded_text }}
            </p>
        </div>

        <template v-if="item.image_link && item.image_src">
            <a :href="item.image_link" target="_blank" class="w-full flex justify-end">
                <q-img :src="item.image_src" class="w-full sm:w-50" />
            </a>
        </template>
        <template v-else-if="item.image_src">
            <q-img :src="item.image_src" class="w-full sm:w-50" />
        </template>
    </div>
</template>
