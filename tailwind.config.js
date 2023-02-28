/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
    "./public/**/*.html",
    "./src/**/*.{ts,tsx}",
  ],
  plugins: [require("flowbite/plugin")],
  theme: {
    extend:{
      colors:{
        'pb-gray': '#D9D9D9',
        'pb-green': '#4CBD17',
        'pb-dark-green': '#1B4308',
      },
      boxShadow: {
        'border': '4px 4px 10px 0px rgba(76, 189, 23, 1)',
      },
      keyframes: {
        expand: {
          '0%': {transform: 'scale(1)'},
          '100%' : {transform: 'scale(1.1)'}
        },
        wobble: {
          '0%,100%': {transform: 'translateX(0%) translateY(0%)',},
          '15%': { transform: 'translateX(-6px) rotate(-6deg)'},
          '30%': {transform: 'translateX(3px) rotate(6deg)'},
          '45%': {transform: 'translateX(-3px) rotate(-3.6deg)'},
          '60%': {transform: 'translateX(1px) rotate(2.4deg)'},
          '75%': {transform: 'translateX(-1px) rotate(-1.2deg)'},
        },
        spin:{
          '0%': {transform: 'rotate(0deg)'},
          '100%': {transform: 'rotate(360deg)'},
        }
      },
      animation: {
        expand: 'expand 0.3s ease-in 0s 1 normal forwards;',
        wobble: 'wobble 2s ease 0s 0.5 normal forwards',
        spin: 'spin 1s linear infinite',
      },
      fontFamily:{
        'istok-web': ['Istok Web', 'sans-serif'],
      }

    }
  },
};
