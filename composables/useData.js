import { useStorage } from '@vueuse/core'
// import { useNotification } from '../composables/useNotification'
import { useDataStore } from '../store/data'
// import { useAuthStore } from '../store/auth'

export async function useData(data_type, action_type = 'get'/* , value = '' */, save_value) {
    const dataStore = useDataStore()
    // const authStore = useAuthStore()

    const runtimeConfig = useRuntimeConfig()
    const URL = runtimeConfig.public.apiUrl
    const token = useCookie('access_token')

    let return_value = []

    async function fetchData() {

        const params = {
            method: action_type === 'get' ? 'GET' : 'POST',
            credentials: 'include',
            headers: {
                custom_header_for_token: token.value,
            },
            body: action_type === 'save' ? save_value : null,
        }

        try {
            if (!token.value)
                throw new TypeError('no access token')

            const response = await $fetch(`${URL}/api/${action_type}/${data_type}`, params) // example: GET http://localhost:3001/api/get/todo

            if (response[data_type]) {
                dataStore.data[data_type] = response[data_type]
                return response[data_type]
            }
            else {
                dataStore.data[data_type] = {}
                return response
            }
        }
        catch {
            const storage_data = useStorage(data_type, [])

            if (action_type === 'get') {
                if (storage_data.value)
                    return storage_data.value
                else
                    return []
            }

            if (action_type === 'save') {
                storage_data.value = save_value

                return storage_data.value
            }
        }
    }

    // TODO улучшить код
    if (!dataStore.data[data_type])
        dataStore.data[data_type] = []

    if (action_type === 'get') {
        if (Object.keys(dataStore.data[data_type]).length === 0 /* && authStore.authenticated */)
            return_value = await fetchData()

        /* else if (Object.keys(dataStore.data[data_type]).length === 0)
            return_value = storageData(data_type, action_type) */

        else
            return_value = dataStore.data[data_type]
    }

    if (action_type === 'save') {
        // if (authStore.authenticated)
        return_value = await fetchData(data_type, action_type)

        /* else // if (authStore.guest)
            return_value = storageData(data_type, action_type) */
        /*
        else
            return_value = dataStore.data[data_type]
        */
    }

    if (return_value)
        return return_value
    else
        return []
}
