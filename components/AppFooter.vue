<script setup>
const menu = ref([
    {
        title: 'Документы',
        link: 'https://ru.wikipedia.org/wiki/%D0%94%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82',
        type: 'external',
    },
    {
        title: 'О проекте',
        link: '/about',
        type: 'inner',
    },
    {
        title: 'Вход',
        link: '/auth',
        type: 'inner',
    },
    {
        title: 'Добро пожаловать',
        link: '/welcome',
        type: 'inner',
    },
])
</script>

<template>
    <footer class="bg-lightgray py-6 px-4 md:px-8 mt-auto">
        <div class="flex flex-col md:flex-row">
            <a href="/" class="text-base font-medium text-black mb-5 md:mb-0 mr-2.5">
                © Rustam_project 2024
            </a>

            <!-- <q-btn label="Очистить куки" @click="null" />
            <q-btn label="Очистить кеш" @click="null" /> -->

            <template v-for="item in menu" :key="item.link">
                <NuxtLink v-if="item.type === 'inner'" :to="item.link" class="mb-5 md:mb-0 text-base font-medium text-darkgray md:mx-2.5">
                    {{ item.title }}
                </NuxtLink>

                <a v-if="item.type === 'external'" :href="item.link" class="mb-5 md:mb-0 text-base font-medium text-darkgray md:mx-2.5" target="_blank">{{ item.title }}</a>
            </template>
        </div>
    </footer>
</template>
