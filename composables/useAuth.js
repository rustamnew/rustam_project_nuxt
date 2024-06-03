import { useAuthStore } from '../store/auth'
import { useNotification } from './useNotification'

// Переписать весь файл по нормальному

const alerts = [
    { message: 'Ошибка авторизации', bgColor: 'red', position: 'bottom-right' },
    { message: 'Ошибка регистрации', bgColor: 'red', position: 'bottom-right' },
    { message: 'Сервер авторизации недоступен', bgColor: 'red', position: 'bottom-right' },
    { message: 'Требуется вход', bgColor: 'red', position: 'bottom-right' },
]

export async function useAuth(formData, actionType = 'login', exit = false, notification = true) {
    const runtimeConfig = useRuntimeConfig()
    const URL = runtimeConfig.public.apiUrl

    const authStore = useAuthStore()

    const username = useCookie('username')
    const token = useCookie('access_token')

    async function auth(byToken = false) {
        let userObj = {}

        try { // Улучшить код
            let response

            if (byToken && !formData) {
                response = await $fetch(`${URL}/api/get/user`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'custom_header_for_token': token.value,
                    },
                })

                if (response.id)
                    userObj = response
            }
            else {
                response = await $fetch(`${URL}/api/${actionType}`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'custom_header_for_token': token,
                    },
                    body: JSON.stringify({
                        ...formData,
                    }),
                })

                if (response.data.user.id)
                    userObj = response.data.user
            }

            authStore.user = userObj
            authStore.guest = false
            authStore.authenticated = true
            authStore.access_token = response.access_token
        }
        catch (error) {
            if (notification)
                useNotification(alerts[0])

            if (byToken)
                clearCookies()

            return false
        }

        return userObj
    }

    function clearCookies() {
        token.value = null
        username.value = null
    }
    function guestLogin() {
        authStore.guest = true
        authStore.authenticated = false
        return { username: 'guest' }
    }

    function logout() {
        authStore.user = {}
        authStore.access_token = null
        authStore.authenticated = false
        authStore.guest = false

        clearCookies()
    }

    let response = false

    if (exit)
        logout()
    else if (formData && formData.username === 'guest')
        response = guestLogin()
    else if (token.value && actionType !== 'register')
        response = auth(true)
    else
        response = auth()

    return response
}
