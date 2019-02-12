import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
        rooms: [],
        newRoom: '',
        
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.createRoom = this.createRoom.bind(this); 
    this.handleChange = this.handleChange.bind(this);	
  }

    componentDidMount() {
      this.roomsRef.on('child_added', snapshot => {
     	const room = snapshot.val();
     	room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
     });
    }

    /* create a new room */
    createRoom(e) {
      e.preventDefault();	
      this.roomsRef.push({ name: this.state.newRoom }); /* add room */
      this.setState({ newRoom: ''});	
    } 


    handleChange(e){
      e.preventDefault();	
      this.setState({ newRoom: e.target.value });  
    }

    /* submit a new room */
    handleSubmit(e) {
    	e.preventDefault();
        const newRoom = { newRoom: this.state.newRoom };
    }


    render() {
      return (
        /* Sidebar */
        <div className="sidebar">
          { this.state.rooms.map( (room) => 
            <div className="room-list" key={ room.key }> 
              <button id="rooms-button" onClick={ () => this.props.setCurrentRoom(room) }>{ room.name }</button>
            </div>
          )}
          <form onSubmit={ (e) => this.handleSubmit(e) }>
            <input id="submit-field" type="text" value={ this.state.newRoom } onChange={ (e) => this.handleChange(e) } />
              <button className="btn btn-primary" onClick={ this.createRoom }>Submit</button>
            </form>
        </div> 
      );
    }
}

export default RoomList;