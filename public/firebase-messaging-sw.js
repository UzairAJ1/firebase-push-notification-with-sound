// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyD3bo07ULA23O_SsAjHZynrGBfMNQb64g8",
  authDomain: "himenus-a55e1.firebaseapp.com",
  projectId: "himenus-a55e1",
  storageBucket: "himenus-a55e1.appspot.com",
  messagingSenderId: "547632849413",
  appId: "1:547632849413:web:0a5e4f17fcf776f016326c"
};
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();


messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);

    const channel = new BroadcastChannel('backgroundMessageChannel');
  channel.postMessage(payload);
  channel.close();
});

