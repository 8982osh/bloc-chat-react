import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
        messages: [], /* all msgs for every room */
        selectedMessages: [],  /* msgs for the selected room */ 
        newMessage: '' 
    };
  	this.messagesRef = this.props.firebase.database().ref('messages');
    this.createMessage = this.createMessage.bind(this); 
    this.handleChange = this.handleChange.bind(this);
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
  
  /* create a new msg */
  createMessage(e) {
    const date = new Date();
    e.preventDefault();
    this.messagesRef.push({ 
      content: this.state.newMessage,
      room: this.props.activeRoom.key,
      sentAt: date.toLocaleTimeString(),
      //this.props.firebase.database.ServerValue.TIMESTAMP,
      username: this.props.user.displayName
    }).then(messages=>{
      this.getRoomMessages();
    });
    this.setState({ newMessage: '' });
  }

  
  handleChange(e) {
    e.preventDefault();
    this.setState({ newMessage: e.target.value }); 
  }


  handleSubmit(e) {
    e.preventDefault();
    //const newMessage = { newMessage: this.state.newMessage };
    //this.setState({ messages: newMessage });
    this.messagesRef.push(this.state.newMessage);

  }
  
  /* get messages by filtering for the selected Room */
  /* use console to test if working */
  getRoomMessages() {
    console.log('this did run');
   	this.setState({ selectedMessages: this.state.messages.filter(message => 
   		message.room === this.props.activeRoom.key) 
   	 });
  }
       
    
  /* render messages on center section */
  render() {
    let messageHeader = (this.props.activeRoom.hasOwnProperty('name')) ? `Messages for ${this.props.activeRoom.name}` : '';

    return (
      <div className="messageList">
        <h2 className="main-header">{ messageHeader }</h2>
          { this.state.selectedMessages.map( (message) => 
            <div className="message" key={ message.key }>
              <p className="content">{ message.content }</p>
              <p className="username">{ message.username }</p>
              <p className="sentAt">Sent at: { message.sentAt }</p>
            </div>
            )
          } 

          <div id="message-form">
            <form onSubmit={ (e) => this.createMessage(e) } >
              <input id="message-field" type="text" value={ this.state.newMessage } onChange={ (e) => this.handleChange(e) } />
              <button id="message-btn" type="submit">Send</button>
            </form>
          </div>   
      </div>         
    );
  }
}

export default MessageList;