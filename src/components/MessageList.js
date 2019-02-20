import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
        messages: [], /* all msgs for every room */
        selectedMessages: [],  /* msgs for the selected room */ 
        /* newMessage */
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
  
 /*
  createMessage(e) {
    e.preventDefault();
    this.newMessage.push({ message: this.state.newMessage )};
    this.setState({ newMessage: ‘’});  
  }
 */

 /* submit a new message 
  handleSubmit(e) {
    e.preventDefault();
    const newMessage = { newMessage: this.state.newMessage };
  }
  */

  /*
  handleChange(e) {
  e.preventDefault();
  this.setState({ newMessage: e.target.value }); 
  }
  */


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