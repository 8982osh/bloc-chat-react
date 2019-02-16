import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
        messages: [], /* all messages for every room */
        selectedMessages: [],  /* array msgs for the selected room */ 
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

 /* Verify component and subcomponents properly rendered */
  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
    if (this.props.activeRoom !== prevProps.activeRoom) {
      console.log('props did update');
      this.getRoomMessages();
    }
  } 
  

  /* get messages by filtering for the selected Room */
  /* use console to test if working */
  getRoomMessages() {
    console.log('this did run');
   	this.setState({ selectedMessages: this.state.messages.filter(message => 
   		message.room === this.props.activeRoom.key) 
   	 });
  }
          
  /* render messages on main section */
  render() {
    let messageHeader = (this.props.activeRoom.hasOwnProperty('name')) ? `Messages for ${this.props.activeRoom.name}` : '';
    return (
      <div className="messageList">
        <h2 className="main-header">{ messageHeader }</h2>
          { this.state.selectedMessages.map( (message) => 
            <div className="message" key={ message.key }>
              <div>
                <p className="content">{ message.content }</p>
                <p className="username">{ message.username }</p>
                <p className="sentAt">{ message.sentAt }</p>
              </div>
            </div> 
          )}  
      </div>   
    );
  }
}

export default MessageList;