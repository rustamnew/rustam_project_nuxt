<script setup>
import IconAndroid from '~/components/icons/IconAndroid.vue'
import IconWeb from '~/components/icons/IconWeb.vue'

useHead({
    title: 'Добро пожаловать',
})
definePageMeta({
    layout: 'empty',
    name: 'Добро пожаловать',
    globalMenu: false,
})
// TODO: перевод в зависимости от языка системы
// TODO: android приложение
// TODO: Анимации ?

onMounted(() => {
    const welcomeVisited = useCookie('welcome_visited')
    welcomeVisited.value = true
})
</script>

<template>
    <div class="flex flex-col items-center bg-blue h-dvh w-full">
        <h1 class="text-h1 text-lightblue mt-16 mb-24">
            Welcome!
        </h1>

        <div class="flex items-center">
            <q-card v-ripple="false" class="border-4 rounded-xl border-[#64b5f5] bg-transparent mx-10 h-full  w-64 cursor-pointer disabled">
                <a href="#" class="flex flex-col items-center">
                    <q-card-section>
                        <ClientOnly>
                            <!-- <q-img class="w-20 h-20" src="/icons/mobile.svg" /> -->
                            <IconAndroid color="#79c3fc" class="w-44 h-44" />
                        </ClientOnly>
                    </q-card-section>
                    <q-card-section class="text-lightblue text-h3 text-center leading-8">
                        Mobile App (Android)
                    </q-card-section>
                </a>
            </q-card>

            <q-card v-ripple class="border-4 rounded-xl border-[#64b5f5] bg-transparent mx-10 h-full    flex flex-col items-center w-64 cursor-pointer">
                <NuxtLink to="/auth" class="flex flex-col items-center">
                    <q-card-section>
                        <ClientOnly>
                            <!-- <q-img src="/icons/desktop.svg" /> -->
                            <IconWeb color="#79c3fc" class="w-44 h-44" />
                        </ClientOnly>
                    </q-card-section>
                    <q-card-section class="text-lightblue text-h3 text-center leading-8">
                        <span>Continue to Web</span>
                    </q-card-section>
                </NuxtLink>
            </q-card>
        </div>
    </div>
</template>
