<script setup>
const _props = defineProps({
    items: Array,
})
</script>

<template>
    <div class="flex md:flex-nowrap">
        <div v-for="tag, index in items" :key="index" class="flex shrink-0">
            <span v-if="index > 0" class="mx-[0.3rem]">
                •
            </span>
            <a :href="tag.link" class="flex items-center" :class="tag.link ? 'hover:underline' : ''">
                <!-- <img v-if="tag.icon_src" :src="tag.icon_src" class="w-4 mr-1"> -->

                <span class="text-base">
                    {{ tag.title }}
                </span>
            </a>
        </div>
    </div>
</template>
