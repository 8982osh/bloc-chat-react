import React, { Component } from 'react';

class extend MessageList Component {
  constructor(props) {
  	super(props);
  	this.state = {
        messages: [],
        newMessage: ''
    };

  	this.messageRef = this.props.firebase.database().ref('messages');
  	this.selectRoom = this.selectRoom.bind(this);
  }

  componentDidMount() {
     this.newMessages.on('child_added' => {
     this.setState({ messages: this.state.message.concat( message ) })
     });
  }


 /* Not to self, render messages on main pg, not sidebar */
  render() {
    return (
    	<div className="container-fluid messages"
      <div className="message-list">
        this.handleClick={( room, message ) => this.state(room, message) }
        <h3 className="room-name">room={ this.state.room }</h3>
        <p className="username">username={ this.state.username }</p>
        <p className="message">messages={ this.state.messages }</p> 
      </div>
      </div>
    );
  }
}

export default MessageList;