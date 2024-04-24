export const useDataStore = defineStore('dataStore', () => {
    const data = ref({})
    const loading = ref(false)

    return { data, loading }
})
