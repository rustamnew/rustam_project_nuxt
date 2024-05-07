<script setup>
import { provide } from 'vue'
import { useStorage } from '@vueuse/core'
import { useAuth } from '~/composables/useAuth'
import { useAuthStore } from '~/store/auth'

const loading = ref(false)
const authStore = useAuthStore()

async function checkAuthToken() {
    const route = useRoute()
    const router = useRouter()

    const token = useCookie('access_token')

    loading.value = true

    if (token.value) {
        const response = await useAuth()

        if (response.id) { // Если пришёл объект с пользователем
            authStore.access_token = token.value
            authStore.authenticated = true

            if (route.path === '/auth')
                router.push({ path: '/' })
        }
    }

    loading.value = false
}
checkAuthToken()

provide('user_loading', loading)
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
