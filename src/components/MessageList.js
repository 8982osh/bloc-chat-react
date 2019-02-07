import React, { Component } from 'react';

class extend MessageList Component {
  constructor(props) {
  	super(props);
  	this.state = {
        messages: [],
        newMessage: ''
    };

  	this.messageRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
     this.newMessages.on('child_added' => {
     this.setState({ messages: this.state.message.concat( message ) })
     });
  }

  /* render message on main pg */
  render() {
    return (
    	<div className="container-fluid messages"
    	  <div className="row">
            <div className="message-list" 
            { this.state.messages.map( (message) => key={message.key}>
              <h3 className="room-name">room={ this.props.activeRoom }</h3>
              <p className="username">username={ message.username }</p>
              <p className="username">username={ message.sentAt }</p>
              <p className="message">messages={ message.content }</p> 
            )}
            </div>
         </div>
      </div>
    );
  }
}

export default MessageList;