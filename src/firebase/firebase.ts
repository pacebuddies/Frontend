import "firebase/messaging";
import firebase from "firebase/app";

const firebaseCloudMessaging = {
  init: async (setFCMToken, fcm_token) => {
    if (!firebase?.apps?.length) {
      // console.log(process.env['NEXT_PUBLIC_FIREBASE_API_KEY'])
      // Initialize the Firebase app with the credentials
      firebase?.initializeApp({
        apiKey: process.env['NEXT_PUBLIC_FIREBASE_API_KEY'],
        authDomain: process.env['NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'],
        projectId: process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'],
        storageBucket: process.env['NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'],
        messagingSenderId: process.env['NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'],
        appId: process.env['NEXT_PUBLIC_FIREBASE_APP_ID'],
        measurementId: process.env['NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID']
      });

      try {
        const messaging = firebase.messaging();


         // Return the token if it is alredy in our local storage
        if (fcm_token !== null) {
          return fcm_token;
        }


        // Request the push notification permission from browser
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            console.log('Notification permission granted.');
            messaging.getToken({ vapidKey: process.env['NEXT_PUBLIC_FIREBASE_VAPID_KEY'] }).then((currentToken) => {
                  if (currentToken) {
                    console.log("token", currentToken)
                    setFCMToken(currentToken)
                    return currentToken;
                  } else {
                    // Show permission request UI
                    console.log('No registration token available. Request permission to generate one.');
                    return null;
                  }
                }).catch((err) => {
                  console.log('An error occurred while retrieving token. ', err);
                  return null
                });
          }
        }).catch((err) => console.log(err))

        if (status && status === "granted") {
        // Get new token from Firebase
          const new_fcm_token = await messaging.getToken({
            vapidKey: process.env['NEXT_PUBLIC_FIREBASE_VAPID_KEY'],
          });

          // Set token in our local storage
          if (new_fcm_token) {
            console.log("token", new_fcm_token)
            setFCMToken(new_fcm_token)
            return new_fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};
export { firebaseCloudMessaging };
