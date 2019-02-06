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
    
    /* display the rooms messages */
    handleClick(room, message) {
      this.setState({ room: activeRoom });
      this.setState({ messages: [...this.state.messages, message] });
    } 

    render() {
      return (
        /* Sidebar */
        <div className="container-fluid sidebar">
          <div className="row">
            <nav class="col-md-2 d-none d-md-block bg-light sidebar">
              <div class="sidebar-sticky">
                
                <div className="all-rooms">
                  {this.state.rooms.map( (rooms) => 
                    <div className="room-list" key={ rooms.key }> 
                      <button className="rooms-button" onClick={ this.handleClick }>{ rooms.name }</button>
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