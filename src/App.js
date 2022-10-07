import './App.css';
import { Component } from 'react';
import AuthPage from './pages/AuthPage/AuthPage';
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

  logout = () => {

    localStorage.removeItem('token')
    let user = null
    this.setState({user})
  }

  
  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar</a>
            <div>
            <div class="navbarNav">
              {this.state.user ?
                <ul class="navbar-nav">
                <li class="nav-item active">
                  <a className="nav-link"
                      onClick={async () => {
                        await this.setState({ showLogin: true })
                        await this.setState({loggedIn: false})
                        this.logout()
                      }}
                  >LogOut</a>
                </li>
                </ul>
                : 
                <ul class="navbar-nav">
                <li class="nav-item active">
                  <a className="nav-link"
                      onClick={async () => {
                        await this.setState({ showLogin: true })
                         this.setState({loggedIn: true})
                      }}
                  >LogIn</a>
                </li>
                <li class="nav-item">
                  <a className="nav-link"
                      onClick={async () => {
                        await this.setState({ showLogin: false })
                         this.setState({loggedIn: true})

                      }}
                  >Signup</a>
                </li>
                </ul>
              }
                
            </div> 
            </div>
        </nav>
        
        {this.state.user ?
         <header className="App-header"> <h1> Hi </h1> </header> 

          : 
          <AuthPage showLogin = {this.state.showLogin}  setUserInState={this.setUserInState} />
        
        }
    
      </div>
    );
  }
 
}






export default App;
