// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@pinia/nuxt',
        'nuxt-quasar-ui',
        '@nuxtjs/google-fonts',
    ],
    quasar: { 
        extras: {
            fontIcons: [
                'fontawesome-v6'
            ]
        }
    },
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
    },
    googleFonts: {
        families: {
            Inter: [400, 500, 700],
            //Inter: '200..700',
            'Noto+Serif': true,
          }
    }
})
