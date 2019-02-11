import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import Navigation from './Navigation'; 
import MessageList from './components/MessageList';


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
      <div className="App">
        <header>
          <Navigation /> 
        </header>
        <main>
          <div className="container-fluid">
            <div className="row>">
              <div className="col-xs-4">
                <RoomList firebase={firebase} />
              </div>
              <div className="col-xs-6">
                <MessageList firebase={firebase} />
              </div>
            </div>
            </div>
        </main>
      </div> 
    );
  }
}

export default App;
