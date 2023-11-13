import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import { fetchToken, onMessageListener } from './firebase';
import {Button, Toast} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import notificationSound from '../src/assets/notification.mp3';

const audio=new Audio(notificationSound);
function Test(editButton) {
  const element = document.getElementById('tst');
  //element.disabled = true;
  if(editButton === true) {
    element.click();
  }
}

export function Test2(editButton) {
  const element = document.getElementById('tst');
  //element.disabled = true;
  if(editButton === true) {
    element.click();
  }
}

function App() {

  

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});
  const [isTokenFound, setTokenFound] = useState(false);
  const [editButton,setEditButton]=useState(false);
  const [state,setState]=useState(false);
  
  useEffect(()=>
{
  Test(editButton);
  console.log("test:",editButton)
},[editButton]);

useEffect(() => {

  // Use the Broadcast Channel API to receive background messages
  const channel = new BroadcastChannel('backgroundMessageChannel');
  channel.onmessage = event => {
    // Handle the background message payload here
    const payload = event.data;
    console.log('Received background message in main application:', payload);

    // You can update your state or perform other actions here
    setState(true);
  };

  return () => {
    channel.close(); // Close the channel when the component unmounts
  };
}, []);
useEffect(()=>
{
  console.log("state is:",state);
  const element = document.getElementById('tst');
  if(state===true)
  {
    element.click();
    setState(false);
  }
},[state])


  fetchToken(setTokenFound);

  onMessageListener().then(payload => {
    setNotification({title: payload.notification.title, body: payload.notification.body})
    setShow(true);
    console.log('onMessageListener');
    setEditButton(true);
    // reset the notification sound flag to false again
    setEditButton(false);
    console.log(payload);
  }).catch(err => console.log('failed: ', err));

  const onShowNotificationClicked = () => {
    audio.play();
    setNotification({title: "Notification", body: "This is a test notification"})
    setShow(true);
  }

  return (
    <div className="App">
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
          position: 'absolute',
          top: 20,
          right: 20,
          minWidth: 200
        }}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">{notification.title}</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{notification.body}</Toast.Body>
        </Toast>
      <header className="App-header">
        {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
        {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
        <img src={logo} className="App-logo" alt="logo" />
        <Button id='tst' onClick={() => onShowNotificationClicked()} className="invisible">Test</Button>
        {/* {editButton &&
          <Button id='btn' >Show Toast</Button>
        } */}
        
      </header>
      
    </div>
  );
}

export default App;
