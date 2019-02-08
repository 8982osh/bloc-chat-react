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
            <div className="all-message"> 
              { this.state.messages.map( (message) => 
              	<div className="message" key={message.key}>
                <div>
                  <h3 className="room-name"> activeRoom={ this.activeRoom }</h3>
                  <p className="content">content={ message.content }</p>
                  <p className="username">username={ message.username }</p>
                  <p className="sentAt">sentAt={ message.sentAt }</p>
                </div>
                </div> 
              )}
              
            </div>
         </div>
      </div>
    );
  }
}

export default MessageList;