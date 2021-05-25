import { useState, useEffect } from "react";
import "./App.css";

import firebase from "./firebase";

function App() {
  const [token, setToken] = useState("");

  const getfcmtoken = () => {
    const messaging = firebase.messaging();
    messaging.getToken().then((token) => {
      console.log("fcm token: ", token);
      setToken(token);
    });
    messaging.getToken();
  };

  const allowNotifications = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") getfcmtoken();
    });
  };

  const fetchPlanets = () => {
    fetch("https://swapi.dev/api/people/1")
      .then((res) => res.json())
      .then((response) => console.log("res: ", response));
  };

  const genericPromiseOne = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("log from promise 1");
        resolve(1);
      }, 1000);
    });

  const genericPromiseTwo = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("log from promise 2");
        reject(2);
      }, 2000);
    });

  const genericPromiseThree = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("log from promise 3");
        resolve(3);
      }, 3000);
    });

  const callGenericPromises = () => {
    Promise.race([
      genericPromiseOne(),
      genericPromiseTwo(),
      genericPromiseThree(),
    ])
      .then((value) => {
        console.log("value: ", value);
      })
      .catch((err) => console.log("err: ", err));
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <p style={{ wordBreak: "break-all" }}>fcm token: {token}</p>
        <button onClick={allowNotifications} style={{ cursor: "pointer" }}>
          I want to recieve notification
        </button>
      </header>
    </div>
  );
}

export default App;
