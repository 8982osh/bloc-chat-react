import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
        rooms: [],
        newRoom: '' 
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.createRoom = this.createRoom.bind(this); 	
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
      this.roomsRef.push({ name: this.state.newRoom }); 	
    } 

    /*  */
    handleChange(e){
      e.preventDefault();	
      this.setState({newRoom: e.target.value});  
    }

    /* submit a new room */
    handlesubmit(e) {
    	e.preventDefault();
        const newRoom = { newRoom: this.state.newRoom };
        this.setState({ rooms: [...this.state.rooms, newRoom] });
    }
    
    render() {
      return (
        <div className="all-rooms">
          {this.state.rooms.map( (rooms) => 
            <div className="list-rooms" key={rooms.key}> 
              <h3>{rooms.name}</h3>
            </div>
            )}
            <form onSubmit={ (e) => this.handleSubmit(e) }>
              <input type="text" value={ this.state.newRoom } onChange={ (e) => this.handleChange(e) } />
              <button id="submit" onClick={ this.createRoom }>Submit</button>
            </form>    
       </div>
      );
    }
}

export default RoomList;