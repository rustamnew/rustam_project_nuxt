export default defineNuxtRouteMiddleware(async (to) => {
    const welcomeVisited = useCookie('welcome_visited') // Не работает при статической генерации!
    if ((!welcomeVisited.value) && to.path !== '/welcome')
        return navigateTo('/welcome')
})
