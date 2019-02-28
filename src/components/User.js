import React, { Component } from 'react';

  class User extends Component {
    constructor(props) {
      super(props);
        this.state = { 
          users: [],
    
    };
  	this.usersRef = this.props.firebase.database().ref('users');
    this.signInWithPopup = this.signInWithPopup.bind(this);
    this.signOutWithPopup = this.signOutWithPopup.bind(this); 
  }

  /* listen for chg, ck if user obj exists and store it */
  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.setState({user});
    });
  }

  /* authenticate user sign-in */
  /* return obj with user property. pass obj to callback func */
  signInWithPopup() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider(); 
    this.props.firebase.auth().signInWithPopup(provider).then((result) => { 
    const user = result.user;
    this.setState({user});
    });
  }
 
  /* user sign out button */
  signOutWithPopup(user) {
    this.props.firebase.auth().signOut(); 
    this.props.setUser(null); /* reset the user to null */
  }

  /* verify user logged in and has selected active room before posting msg 
  verifyUser(e){
  e.preventDefault();
    if(!this.props.user && !this.props.activeRoom) {
      alert("Please select a room, before posting a message.");
    } else { 
    this.props.createMessage();
    }
  } */

  /* render new message in active room */
  render() { 
    return (
      <div className="login-prompt">
        <button className="btn btn-info" onClick={this.props.user ? this.signOutWithPopup : this.signInWithPopup}>
          <span>Sign {this.props.user ? 'Out' : 'In'}</span>
        </button>
        <div className="login-name">Logged in as: {this.props.user ? this.props.user.displayName: ''}</div>
      </div>
    );
  }      
}

         

export default User;
