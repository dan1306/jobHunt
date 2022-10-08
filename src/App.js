import './App.css';
import { Component } from 'react';
import AuthPage from './pages/AuthPage/AuthPage';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


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
        
        <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {this.state.user ?
                <Nav className="me-auto">
                  <Nav.Link href="#home"
                   onClick={async () => {
                        await this.setState({ showLogin: true })
                        await this.setState({loggedIn: false})
                        this.logout()
                    }}
                    
                  
                  >
                    LogOut
                  </Nav.Link>
                </Nav>
                  :

                <Nav className="me-auto">
                  <Nav.Link
                   onClick={async () => {
                        await this.setState({ showLogin: false })
                         this.setState({loggedIn: true})

                      }}
                  >
                    Signup
                  </Nav.Link>
                  <Nav.Link
                  onClick={async () => {
                        await this.setState({ showLogin: true })
                         this.setState({loggedIn: true})
                      }}
                  >
                    LogIn
                  </Nav.Link>
                </Nav>

              }
            
        </Navbar.Collapse>
      </Container>
    </Navbar>

       

  
        
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
