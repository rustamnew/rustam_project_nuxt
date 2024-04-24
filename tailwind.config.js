/** @type {import('tailwindcss').Config} */

// Принимает px - Number, выдаёт строку типа '1rem'
function remFromPx(px) {
    px = Number(px)
    const rem = `${px / 16}rem`
    return rem
}

export default {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue',
    ],

    theme: {
        extend: {
            borderRadius: {
                8: '1.25rem',
            },
            colors: {
                black: '#0F0F0F',
                darkgreen: '#337566',
                bisque: '#FFF7EB',
                gray: '#E8E8E8',
                lightgray: '#DBDBDB',
                darkgray: '#6B6B6B',
                red: '#BD3223',
                blue: '#2196F3',
                lightblue: '#79c3fc',
            },
            fontSize: {
                sm: [remFromPx(13), remFromPx(20)],
                base: [remFromPx(15), remFromPx(24)],
                lg: [remFromPx(17), remFromPx(20)],
                lgExt: [remFromPx(17), remFromPx(27)],
                h3: [remFromPx(24), remFromPx(28)],
                h3_mobile: [remFromPx(20), remFromPx(24)],
                h1: [remFromPx(80), remFromPx(90)],
                h2: [remFromPx(54), remFromPx(70)],
                logo: [remFromPx(28), remFromPx(28)],
            },
            width: {
                '3xl': '60rem',
                'medium': '35rem',
                '35': remFromPx(140),
                '50': remFromPx(200),
                '22': remFromPx(88),
            },
            maxWidth: {
                medium: '35rem',
            },
            height: {
                35: remFromPx(140),
            },
        },
        theme: {

        },
    },

    plugins: [],
}
