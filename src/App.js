import './App.css';
import { Component } from 'react';
import AuthPage from './pages/AuthPage/AuthPage';

class App extends Component {

  state = {
    user:null
  }
  
  componentDidMount = () => {
    let token = localStorage.getItem('token')
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]))
      if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('token')
        token = null
      } else {
        let user = payload.user
        this.setState({ user })
      }
    }
  }
  
  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData})
  }
  
  render() {
    return (
      <div className="App">
        {this.state.user ?
         <header className="App-header"> <h1> Hi </h1> </header> 

          : 
          <AuthPage setUserInState={this.setUserInState} />
        
        }
    
      </div>
    );
  }
 
}






export default App;
