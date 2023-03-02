## Getting started

### Install and start app
#### 1. Install system pre-requisites:
`Next.js` requires [`Node.js`](https://nodejs.org) installed.
+ [Node.js](https://nodejs.org) (v18.12 LTS or later)

#### 2. Setup `npm` and `yarn`:

```bash
npm i -g npm yarn
```

#### 3. Install the dependencies:

```bash
yarn install
```

If yarn is not working in PowerShell type this command in PowerShell with administrator privileges

```bash
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
```
To change the address of the API server go to `.env.local` and change the `NEXT_PUBLIC_API_GATEWAY_ADDRESS` variable

#### 4. Start the dev server:
To start dev server run this command
```bash
npm run dev
```
or use your IDE to start the dev server

#### 5. Open the app in the browser:
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tools installed in project

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
