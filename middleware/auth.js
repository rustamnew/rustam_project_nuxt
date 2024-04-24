import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware(async (to/* , from */) => {
    const authStore = useAuthStore()
    const userAuthenticated = computed(() => authStore.authenticated)

    if (!userAuthenticated.value && to.path !== '/auth')
        return navigateTo('/auth')
})
