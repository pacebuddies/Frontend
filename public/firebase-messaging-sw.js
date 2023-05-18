importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');


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

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = { body: payload.notification.body };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
