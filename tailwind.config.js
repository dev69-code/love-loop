/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                playfair: ['"Playfair Display"', 'serif'],
                quicksand: ['"Quicksand"', 'sans-serif'],
            },
            colors: {
                'accent-pink': '#ff80ab',
                'soft-pink': '#ffe4e1',
                'petal': '#ffcdd2',
            }
        },
    },
    plugins: [],
}
