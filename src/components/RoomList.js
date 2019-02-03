import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
        rooms: [] 
    };
    this.roomsRef = this.props.firebase.database().ref('rooms'); 	
  }

    componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
     	const room = snapshot.val();
     	room.key = snapshot.key;
     this.setState({ rooms: this.state.rooms.concat( room ) })
     });
    }
    
    render() {
      return (
        <div className="all-rooms">
            {this.state.rooms.map( (rooms) => 
              <div className="room-list" key={rooms.key}> 
                <h3>{rooms.name}</h3>
              </div>
            )}    
       </div>
      );
    }
}

export default RoomList;