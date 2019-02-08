import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
        rooms: [],
        newRoom: '',
        activeRoom: '' 
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

    /*  */
    handleChange(e){
      e.preventDefault();	
      this.setState({newRoom: e.target.value});  
    }

    /* submit a new room */
    handleSubmit(e) {
    	e.preventDefault();
        const newRoom = { newRoom: this.state.newRoom };
        this.setState({ rooms: [...this.state.rooms, newRoom] });
    }
  
    /* set to current room for messages */
    setRoom(room) {
      this.props.activeRoom(room);
    }


    render() {
      return (
        /* Sidebar */
        <div className="container-fluid sidebar">
          <div className="row">
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky">
                
                <div className="all-rooms">
                  {this.state.rooms.map( (room) => 
                    <div className="room-list" key={ room.key }> 
                      <button className="rooms-button" onClick={ (e) => this.setRoom(room) }> { room.name }</button>
                    </div>
                  )}
                  <form onSubmit={ (e) => this.handleSubmit(e) }>
                    <input type="text" value={ this.state.newRoom } onChange={ (e) => this.handleChange(e) } />
                    <button id="submit" onClick={ this.createRoom }>Submit</button>
                  </form>
                </div>
              </div>
            </nav>    
         </div>
      </div>
      );
    }
}

export default RoomList;