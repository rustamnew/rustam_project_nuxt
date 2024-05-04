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
    const user = useStorage('user')

    loading.value = true

    if (user.value) {
        authStore.user = JSON.parse(user.value)
        authStore.authenticated = true
    }

    if (token.value) {
        authStore.access_token = token.value
        const response = await useAuth()

        if (response && (response.name && !response.name.includes('Error')) && route.path === '/auth')
            router.push({ path: '/' })
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
