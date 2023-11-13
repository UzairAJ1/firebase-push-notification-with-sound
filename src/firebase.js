import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD3bo07ULA23O_SsAjHZynrGBfMNQb64g8",
  authDomain: "himenus-a55e1.firebaseapp.com",
  projectId: "himenus-a55e1",
  storageBucket: "himenus-a55e1.appspot.com",
  messagingSenderId: "547632849413",
  appId: "1:547632849413:web:0a5e4f17fcf776f016326c"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, {vapidKey: 'BO6bK9Qq-ZFJztAa4pz4EbItZyXlaOoQItckS6fFKY813rQO5If7fMNKjeNLhf73YpZewDl7wflrzRcxmMK7F1g'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}



export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});