// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // ssr: false,
    // sourcemap: false,
    // devtools: { enabled: true },
    modules: [
        '@pinia/nuxt',
        'nuxt-quasar-ui',
        '@nuxtjs/google-fonts',
    ],
    quasar: {
        plugins: ['Notify'],
        extras: {
            fontIcons: [
                'fontawesome-v6',
            ],
        },
    },
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    googleFonts: {
        preload: true,

        families: {
            'Inter': [400, 500, 700],
            'Noto+Serif': true,
        },
    },
})
