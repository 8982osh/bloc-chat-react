import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
        messages: [], /* all messages */
        selectedMessages: [],  /* messages for the selected room */ 
    };
  	this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
      this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
     });
  }

  /* set the current room */
  setCurrentRoom(room) {
    this.setState({ room: room })  
  }

  /* retrieve messages for the selected Room */
  getRoomMessages() {
   	this.selectedMessages({ selectedMessages: this.state.messages.filter(message => 
   		message.key) 
   	 });
   return this.selectedMessages /* array of msgs */
  }
          
  /* render messages on main section */
  render() {
    return (
      <div className="messageList">
          {this.state.getRoomMessages.map( (message) => 
            <div className="message" key={message.key}>
              <div>
                <h3 className="main-header">{this.setCurrentRoom()}</h3>
                <p className="content">{message.content}</p>
                <p className="username">{message.username}</p>
                <p className="sentAt">{message.sentAt}</p>
              </div>
            </div> 
          )}  
      </div>   
    );
  }
}

export default MessageList;