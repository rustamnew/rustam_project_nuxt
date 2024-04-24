export const useAuthStore = defineStore('auth', () => {
    const user = ref({})
    const access_token = ref('')
    const authenticated = ref(false)
    const guest = ref(false)

    return { user, access_token, authenticated, guest }
})
