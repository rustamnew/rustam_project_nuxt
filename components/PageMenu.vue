<script setup>
import { useAuthStore } from '~/store/auth'
import { useDataStore } from '~/store/data'

const router = useRouter()
const route = useRoute()

const authStore = useAuthStore()

const menu = ref([])
const routes = router.getRoutes()

const menu_array = []

routes.forEach((item) => {
    let needSort = false
    if (item.name && item.path && item.path !== '/' && item.meta.globalMenu !== false) {
        if (item.meta.order > 0)
            needSort = true

        if (item.meta.middleware && item.meta.middleware.includes('auth')) // Временное решение с v-show
            item.needAuth = true

        // if (!item.meta.middleware)
        menu_array.push(item)
        /* else if (item.meta.middleware.includes('auth') && authStore.authenticated) 
            menu_array.push(item) */
    }

    if (needSort) {
        function compareOrders(a, b) {
            return a.meta.order - b.meta.order
        }
        menu_array.sort(compareOrders)
    }

    menu.value = menu_array
})
</script>

<template>
    <div class="flex flex-col-reverse sm:flex-col items-center border-transparent overflow-hidden">
        <nav class="w-full md:justify-center  flex flex-nowrap py-3 px-4 md:px-0 md:mt-5 md:pb-5 overflow-x-auto border-[#CCCCCC] border-b">
            <button v-for="item in menu" v-show="item.needAuth && authStore.authenticated || !item.needAuth" :key="item.path" class="shrink-0 bg-gray hover:bg-lightgray rounded-xl py-2 px-3 border mx-1 text-base font-medium" :class="route.path === item.path ? 'border-black' : 'border-transparent'" @click="router.push({ path: item.path })">
                {{ item.name }}
            </button>
        </nav>
    </div>
</template>
