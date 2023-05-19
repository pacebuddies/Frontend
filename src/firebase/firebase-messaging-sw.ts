// Import the Firebase service worker modules
import { initializeApp } from 'firebase/app'
import { getMessage, onBackgroundMessage } from 'firebase/messaging'
// Import any other necessary Firebase service worker modules


// Google mówi, że można spokojnie upubliczniać takie rzeczy bo zabezpieczenia stoją po stronie Firebase
// Ja im nie wierzę ale również mnie to nie obchodzi :^)
// Zresztą na froncie i tak nie da się niczego ukryć
const firebaseConfig = {
    apiKey: process.env['NEXT_PUBLIC_FIREBASE_API_KEY'],
    authDomain: process.env['NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'],
    projectId: process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'],
    storageBucket: process.env['NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'],
    messagingSenderId: process.env['NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'],
    appId: process.env['NEXT_PUBLIC_FIREBASE_APP_ID'],
    measurementId: process.env['NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID']
};

const app = initializeApp(firebaseConfig);

// Retrieve the messaging instance
const messaging = getMessaging(app)



// const app       = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

onBackgroundMessage(messaging, (payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
