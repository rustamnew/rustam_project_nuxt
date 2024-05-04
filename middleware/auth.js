import { useAuthStore } from '~/store/auth'
import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware(async (to/* , from */) => {
    const authStore = useAuthStore()
    const userAuthenticated = computed(() => authStore.authenticated) //

    if (!userAuthenticated.value && to.path !== '/auth') {
        const response = await useAuth(null, null, false, false)

        if (!response)
            return navigateTo('/auth')
    }
})
