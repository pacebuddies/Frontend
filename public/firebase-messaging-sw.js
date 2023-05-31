// Import the Firebase service worker modules
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');
// Import any other necessary Firebase service worker modules


// Google mówi, że można spokojnie upubliczniać takie rzeczy bo zabezpieczenia stoją po stronie Firebase
// Ja im nie wierzę ale również mnie to nie obchodzi :^)
// Zresztą na froncie i tak nie da się niczego ukryć
const firebaseConfig = {
  apiKey: "AIzaSyBNAdtwnOV-fv5tV2O7WrrBxdYgacSOaQs",
  authDomain: "pacebuddies-5e758.firebaseapp.com",
  projectId: "pacebuddies-5e758",
  storageBucket: "pacebuddies-5e758.appspot.com",
  messagingSenderId: "482452928289",
  appId: "1:482452928289:web:de0a8985ed568a95f77060",
  measurementId: "G-QPL96D7YYV"
};

firebase.initializeApp(firebaseConfig);

// Retrieve the messaging instance
const messaging = firebase.messaging();



// const app       = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// messaging.onBackgroundMessage((payload) => {
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };
//
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
