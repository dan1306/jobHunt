import './App.css';
import { Component } from 'react';
import AuthPage from './pages/AuthPage/AuthPage';
import { Route, Routes, Navigate } from 'react-router-dom';
import IndexPage from './pages/IndexPage/IndexPage'
import NavBar from './components/NavBar/NavBar';



class App extends Component {

  state = {
    user: null,
    showLogin: true,
    loggedIn: false

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

  logout = async () => {
    
    await this.setState({ showLogin: true })
    await this.setState({loggedIn: false})

    localStorage.removeItem('token')
    let user = null
    this.setState({user})
  }

  Signup = async () => {
    await this.setState({ showLogin: false })
    this.setState({loggedIn: true})
  }

  LogIn = async () => {
    await this.setState({ showLogin: true })
    this.setState({loggedIn: true})
  }
  
  render() {
    return (
      <div className="App">
        
        <NavBar userState={this.state.user} logout= {this.logout} Signup ={this.Signup} LogIn= {this.LogIn} />
        
        {this.state.user ?


          <IndexPage />

          : 
          <AuthPage showLogin = {this.state.showLogin}  setUserInState={this.setUserInState} />
        
        }
    
      </div>
    );
  }
 
}






export default App;
