<script setup>
import { useAuth } from '~/composables/useAuth'

const router = useRouter()

useHead({
    title: 'Вход',
})
definePageMeta({
    layout: 'empty',
    name: 'Вход',
    globalMenu: false,
    middleware: 'auth',
})

/* const alerts = [
    { message: 'Сохранено', bgColor: 'green', position: 'bottom-right' },
    // { message: 'Ошибка авторизации', bgColor: 'red', position: 'bottom-right' },
    // { message: 'Сохранено', bgColor: 'green', icon: 'report_problem' }, //'warning' 'thumb_up' 'tag_faces'
    // { bgColor: 'purple', message: 'Jim just pinged you', avatar: 'https://cdn.quasar.dev/img/boy-avatar.png' },
    // { multiLine: true, message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quisquam non ad sit assumenda consequuntur esse inventore officia. Corrupti reiciendis impedit vel, fugit odit quisquam quae porro exercitationem eveniet quasi.' },
] */

const username = ref(null)
const password = ref(null)
const guest = ref(false)
const loading = ref(false)
const formName = ref('login')

async function onSubmitAuth() {
    loading.value = true

    if (guest.value === true) {
        guestLogin()
        return
    }

    const requestObj = {
        username: username.value,
        password: password.value,
    }

    const response = await useAuth(requestObj, formName.value)

    if (response) {
        loading.value = true
        router.push({ path: '/' })
    }
    else {
        // useNotification(alerts[1])
        loading.value = false
    }
}

async function guestLogin() {
    const response = await useAuth({
        username: 'guest',
        password: 'guest',
    }, formName.value)

    if (response.username)
        router.push({ path: '/' })
}

function switchForm(newFormName) {
    formName.value = newFormName
}
function guestToggle(toggleValue) {
    if (toggleValue === true) {
        username.value = 'guest'
        password.value = 'guest'
    }
    else {
        username.value = ''
        password.value = ''
    }

    guest.value = toggleValue
}
</script>

<template>
    <q-spinner
        v-if="loading === true"
        color="primary"
        size="3em"
        class="absolute top-2 left-4"
    />

    <q-card class="w-4/5 mt-[10vh] sm:w-96 lg:mt-[20vh]">
        <q-card-section v-if="formName === 'login'">
            <h1 class="text-3xl mb-6">
                Вход
            </h1>

            <q-form
                class="q-gutter-md mb-4"
                @submit="onSubmitAuth"
            >
                <div :class="guest ? 'disabled' : ''">
                    <q-input v-model="username" :disable="guest ? true : false" filled hint="Логин" class="mb-3" autocomplete="username" />
                    <q-input v-model="password" :disable="guest ? true : false" filled type="password" hint="Пароль" autocomplete="password" />
                </div>

                <q-toggle v-model="guest" label="Войти как гость" @update:model-value="(value, evt) => guestToggle(value)" />

                <div class="flex justify-center w-[96%] mr-4">
                    <q-btn label="Войти" type="submit" color="primary" />
                </div>
            </q-form>

            <div class="flex flex-col sm:flex-row sm:flex-nowrap justify-between items-center mt-2">
                <span class="text-darkgray my-2">У Вас нет аккаунта? </span>
                <q-btn flat size="md" label="Зарегистрируйтесь" color="primary" @click="switchForm('register')" />
            </div>
        </q-card-section>

        <q-card-section v-if="formName === 'register'">
            <h1 class="text-3xl mb-6">
                Регистрация
            </h1>

            <q-form
                class="q-gutter-md"
                @submit="onSubmitAuth"
            >
                <div>
                    <q-input v-model="username" :disable="guest ? true : false" filled hint="Логин" class="mb-3" />
                    <q-input v-model="password" :disable="guest ? true : false" filled type="password" hint="Пароль" />
                </div>

                <div class="flex justify-center w-[96%] mr-4">
                    <q-btn label="Зарегистрироваться" type="submit" color="primary" />
                </div>
            </q-form>

            <div class="flex flex-col sm:flex-row sm:flex-nowrap justify-between items-center mt-4">
                <span class="text-darkgray my-2">Есть аккаунт?</span>
                <q-btn flat size="md" label="Войти" color="primary" @click="switchForm('login')" />
            </div>
        </q-card-section>
    </q-card>
</template>
