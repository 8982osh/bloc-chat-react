import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBM5_zSzcc_1zrVJblgtfoWO7HMWMAkxK8",
    authDomain: "bloc-chat-react-3628c.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-3628c.firebaseio.com",
    projectId: "bloc-chat-react-3628c",
    storageBucket: "bloc-chat-react-3628c.appspot.com",
    messagingSenderId: "953188243284"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <RoomList firebase={firebase}/>  
    );
  }
}

export default App;
