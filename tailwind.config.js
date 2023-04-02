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
      spacing:{
        '92' : '23rem',
      },
      height:{
        '128': '32rem',
        '160': '40rem',
        '192': '48rem',
        '224': '56rem',
        '256': '64rem',
        '288': '72rem',
        '320': '80rem',
        '352': '88rem',
        '384': '96rem',
        '512': '128rem',
      },
      width:{
        '128': '32rem',
        '160': '40rem',
        '192': '48rem',
        '224': '56rem',
        '256': '64rem',
        '288': '72rem',
        '320': '80rem',
        '352': '88rem',
        '384': '96rem',
        '512': '128rem',
      },
      colors:{
        'pb-gray': '#D9D9D9',
        'pb-dark-gray': '#565656',
        'pb-green': '#4CBD17',
        'pb-dark-green': '#1B4308',
        'pb-red-discard': '#BD1717'
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
        },
        widthSizeBig: {
            '0%': {width: '4rem'},
            '100%': {width: '48rem'},
        },
        widthSizeSmall: {
          '0%': {width: '4rem'},
          '100%': {width: '16rem'},
        }
      },
      animation: {
        expand: 'expand 0.3s ease-in 0s 1 normal forwards;',
        wobble: 'wobble 2s ease 0s 0.5 normal forwards',
        spin: 'spin 1s linear infinite',
        widthExpandBig: 'widthSizeBig .5s ease-in-out 0s 1 normal forwards;',
        widthExpandSmall: 'widthSizeSmall .5s ease-in-out 0s 1 normal forwards;',
      },
      fontFamily:{
        'istok-web': ['Istok Web', 'sans-serif'],
      }

    }
  },
};
