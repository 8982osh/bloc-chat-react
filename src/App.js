import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import Navigation from './Navigation'; 
import MessageList from './components/MessageList';
import User from './components/User';



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
  constructor(props) {
    super(props)
      this.state = {
        activeRoom: '', /* current rm in use */
        user: null
    };
  }

  /* set the current room for selected msgs */
  setCurrentRoom(room) {
    this.setState({ activeRoom: room });  
  }

  setUser(user) {
    this.setState({user: user});
  }


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
                <RoomList firebase={firebase} setCurrentRoom={(room)=>this.setCurrentRoom(room)} />
              </div>
              <div className="col-xs-6">
                <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />   
              </div>
              <User firebase={firebase} setUser={this.setUser.bind(this)} user={this.state.user} /> 
            </div>
            </div>
        </main>
      </div> 
    );
  }
}

export default App;
