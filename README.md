## Getting started

`Next.js` requires [`Node.js`](https://nodejs.org).

If you don't already have `npm` and `yarn` available, make sure you set them up.

```bash
npm i -g npm yarn
```

Install the dependencies:

```bash
yarn install
```

If yarn is not working in PowerShell type this command in PowerShell with administrator privileges

```bash
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
```
You need to create ```.env.local``` based on ```.env.local.example```, in ```{}``` are values you need to change
```
STRAVA_CLIENT_ID={client id from strava}
STRAVA_CLIENT_SECRET={client secret from strava}
STRAVA_CLIENT_SCOPE=read,read_all,profile:read_all,activity:read,activity:read_all
STRAVA_CALLBACK_URL=http://localhost:3000
NEXTAUTH_SECRET=very_secret
```

To start dev server run this command
```bash
npm run dev
```

Tools installed to package

- [x] [`flowbite`](https://flowbite.com)
- [x] [`flowbite-react`](https://flowbite-react.com)
- [x] [`react-icons`](https://react-icons.github.io/react-icons)
- [x] [`heroicons`](https://heroicons.com/)
- [x] [`react-chartjs-2`](https://react-chartjs-2.js.org/)
- [`chart.js`](https://react-chartjs-2.js.org/)
- [x] [`react-toastify`](https://fkhadra.github.io/react-toastify/introduction)
- [x] [`tailwindcss`](https://tailwindcss.com)
- [x] Quality of life tools, like
  - [x] [`eslint`](https://eslint.org) with some plugins
  - [x] [`prettier`](https://prettier.io)

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
