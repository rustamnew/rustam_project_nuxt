<script setup>
import { useRouter } from 'vue-router'
import { inject } from 'vue'
import { useAuthStore } from '~/store/auth'
import IconMenu from '~/components/icons/IconMenu.vue'

const router = useRouter()

const user_expanded = ref(false)
const avatarHide = ref(false)

const authStore = useAuthStore()

const user_loading = inject('user_loading')

function toggleUserMenu() {
    user_expanded.value = !user_expanded.value
}

function logout() {
    useAuth(null, null, true)
    router.push({ path: '/auth' })
}
</script>

<template>
    <header class="flex flex-nowrap justify-between items-center bg-black text-white p-4 sm:py-0 sm:px-10 h-16">
        <div class="logo flex shrink-0 items-center">
            <a href="/" class="text-logo font-semibold" style="font-family: 'Noto Serif';">
                Project
            </a>
        </div>

        <q-spinner
            v-if="user_loading === true"
            color="primary"
            size="3em"
        />
        <h3 v-else class="text-xl">
            {{ authStore.guest ? 'Гость' : authStore.user.username }}
        </h3>

        <NuxtLink v-if="!authStore.authenticated" to="/auth" class="ml-6">
            <q-btn color="primary" class="rounded-lg " text-color="white" label="Войти" />
        </NuxtLink>

        <template v-if="authStore.authenticated">
            <div class="h-12 shrink-0 flex flex-nowrap rounded-3xl overflow-hidden ml-9">
                <div class="h-full flex items-center bg-gray pl-2  transition-all duration-500" :class="user_expanded ? 'w-20' : 'w-3'">
                    <div class="opacity-0" :class="user_expanded ? 'delay-400 opacity-100' : 'delay-0 opacity-0'">
                        <q-btn color="primary" class="rounded-lg" size="sm" text-color="white" label="Выйти" @click="logout()" />
                    </div>
                </div>
                <div class="h-full bg-gray p-1 flex items-center justify-end relative">
                    <q-icon class="cursor-pointer text-black text-[19px] mr-2.5" :name="user_expanded ? 'fa-solid fa-x' : 'fa-solid fa-bars'" @click="toggleUserMenu()" />

                    <q-avatar v-if="authStore.user.avatar_src && avatarHide === false" size="20" class="h-10 w-10">
                        <q-img :src="authStore.user.avatar_src" @error="avatarHide = true" />
                    </q-avatar>
                </div>
            </div>
        </template>
    </header>
</template>
