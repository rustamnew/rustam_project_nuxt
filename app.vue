<script setup>
import { provide } from 'vue'

const loading = ref(false)

async function checkAuthToken() {
    loading.value = true
    const token = useCookie('access_token')

    if (token.value)
        await useAuth()

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
