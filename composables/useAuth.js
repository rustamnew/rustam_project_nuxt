// import { useStorage } from '@vueuse/core'
import { useAuthStore } from '../store/auth'
// import { useDataStore } from '../store/data'
import { useNotification } from './useNotification'

// Переписать весь файл по нормальному

const URL = 'http://localhost:3001'

const alerts = [
    { message: 'Ошибка авторизации', bgColor: 'red', position: 'bottom-right' },
    { message: 'Ошибка регистрации', bgColor: 'red', position: 'bottom-right' },
    { message: 'Сервер авторизации недоступен', bgColor: 'red', position: 'bottom-right' },
]

export async function useAuth(formData, actionType = 'login', logout = false) {
    const authStore = useAuthStore()
    // const dataStore = useDataStore()
    const token = useCookie('access_token')

    async function auth() {
        try {
            const response = await $fetch(`${URL}/api/${actionType}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    /* username: formData.username,
                    password: formData.password, */
                    ...formData,
                }),
            })

            if (response.data.user.id) {
                authStore.guest = false
                authStore.user = response.data.user // TODO Убрать лишний userdata
                authStore.access_token = response.access_token
                authStore.authenticated = true

                // dataStore.data = response.data.user.userdata

                return response
            }
            else {
                useNotification(alerts[0])
                throw new Error('user id not found! (response.data.user.id)')
            }
        }
        catch (error) {
            useNotification(alerts[0])
            return false
        }
    }

    async function getUserByToken() {
        try {
            const response = await $fetch(`http://localhost:3001/api/get/user`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'custom_header_for_token': token.value,
                },
            })

            if (response.id) {
                authStore.guest = false
                authStore.user = response
                authStore.authenticated = true

                return response
            }
            else {
                throw new Error('user id not found! (response.data.user.id)')
            }
        }
        catch (error) {
            return error
        }
    }

    function guestLogin() {
        authStore.guest = true
        authStore.authenticated = false
        return { username: 'guest' }
    }

    /*
    function getUser() {
        return authStore.user
    }

    async function logout() {
        authStore.user = {}
        authStore.access_token = ''
        authStore.authenticated = false
        authStore.guest = false
    }
    */

    if (logout) {
        authStore.guest = false
        authStore.user = {}
        authStore.access_token = ''
        authStore.authenticated = false
        token.value = ''
        return
    }

    if (formData && formData.username === 'guest')
        return guestLogin()
    else if (token.value && actionType !== 'register')
        return getUserByToken()
    else
        return auth()
}
