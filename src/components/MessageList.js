import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
        messages: [],
        newMessage: ''
    };

  	this.messageRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
      this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
     });
    }

  /* render message on main pg */
  render() {
    return (
    	<div className="container-fluid messages">
    	  <div className="row">
            <div className="message-list"> 
              { this.state.messages.map( (message) => key={ message.key }>
                <div>
                <h3 className="room-name">room={ this.props.activeRoom }</h3>
                <p className="username">username={ message.username }</p>
                <p className="sentAt">sentAt={ message.sentAt }</p>
                <p className="content">messages={ message.content }</p>
                </div> 
              )}
              
            </div>
         </div>
      </div>
    );
  }
}

export default MessageList;