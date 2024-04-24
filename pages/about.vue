<script setup>
useHead({
    title: 'О проекте',
})
definePageMeta({
    layout: 'default',
    name: 'О проекте',
    order: 99,
})

const showPhone = ref(false)
const company = ref({
    name: 'Яруллин Рустам',
    phone: '+79872053376',
    image_src: '/images/author.png',
    counts: {
        agents: 5,
    },
    tags: [
        {
            title: '23 года',
        },
        {
            title: 'Казань',
        },
        /*
        {
            title: 'Документы проверены',
            icon_src: '/icons/verified.svg',
        },
        {
            title: '4.7',
            icon_src: '/icons/star.svg',
            link: '#',
        },
        {
            title: '19 отзывов',
            link: '#',
        },
        */
    ],
})
const about = ref([
    {
        id: 101,
        title: 'Frontend',
        text: 'Nuxt 3, Quasar, Tailwind CSS',
    },
    {
        id: 102,
        title: 'Backend ',
        text: 'Node.js (Express.js)',
        bg_color: '#E8E8E8',
        expanded_text: `
                - Создание и вход в аккаунт
                - Сохранение данных пользователя
                - Аутентификация с использованием JWT (JSON Web Token) 
            `,
    },
    {
        id: 103,
        title: 'Platforms',
        text: 'Web, Android (coming soon)',
        text_color: 'darkgreen',
        // image_src: '/images/15.png',
        // image_link: 'https://yandex.ru/maps/-/CDFHBJ7j',
    },
])
</script>

<template>
    <h3 class="text-h3 mb-6">
        Об авторе
    </h3>

    <div v-if="company" class="flex flex-col items-center pt-6 sm:pt-0">
        <q-img v-if="company.image_src" :src="company.image_src" alt="logo" class="rounded-8 w-[120px] h-[120px] mb-6" />

        <h3 class="text-h3 font-semibold mb-[0.55rem]">
            {{ company.name }}
        </h3>

        <TagList v-if="company.tags" :items="company.tags" />

        <div v-if="company.phone" class="mt-[1.4rem]">
            <button v-if="!showPhone" class="bg-darkgreen hover:bg-[#378a77] text-white text-base py-4 px-5 rounded-xl" @click="showPhone = true">
                Показать номер телефона
            </button>

            <a v-if="showPhone" class="text-darkgreen text-3xl hover:underline flex h-14" :href="`tel:${company.phone}`">{{ company.phone }}</a>
        </div>
    </div>

    <h3 class="text-h3 mt-20 mb-4">
        О проекте
    </h3>

    <p class="text-lgExt sm:w-medium">
        Пет-проект представляет из себя набор полезных страниц на каждый день.
    </p>
    <p class="text-lgExt sm:w-medium">
        Для получения доступа к расширенному функционалу — войдите в аккаунт
    </p>

    <div class="w-full md:w-medium mt-6 md:mt-8 mb-16">
        <AboutItem v-for="item in about" :key="item.id" :item="item" />
    </div>
</template>
