import { Component } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NavBar.css'

export default class NavBar extends Component {
    render() {

    const {userState, logout, Signup, LogIn} = this.props
    return (
        <Navbar className="nav-color" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {userState ?
                <Nav className="me-auto">
                <NavDropdown title="Hunt Overview" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to="/interested" className='rm-underline'>
                      Interested
                    </Link>
                  </NavDropdown.Item>
                    <NavDropdown.Divider />
                  <NavDropdown.Item>
                  <Link to="/applied" className='rm-underline'>
                      Applied
                    </Link>
                      
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.3">
                    
                    <Link to="/interviewing" className='rm-underline'>
                    Interviewing
                    </Link>
                  </NavDropdown.Item>
              <NavDropdown.Divider />
                  <NavDropdown.Item>
                  <Link to="/offer" className='rm-underline'>
                    Offer
                    </Link>
                
              </NavDropdown.Item>
              <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                  <Link to="/accepted" className='rm-underline'>
                  Accepted
                    </Link>
                
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                  <Link to="/summary" className='rm-underline'>
                  Summary
                    </Link>
                
                    </NavDropdown.Item>
                    
                  </NavDropdown>
                  <NavDropdown title="Interview Prep" id="basic-nav-dropdown">
                
              <NavDropdown.Item href="#action/3.4">
                Resume
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                Interview Questions And Answers
                    </NavDropdown.Item>

                  </NavDropdown>
                  <Nav.Link href="#home"
                   onClick={async () => {
                        logout()
                    }}
                    
                  
                  >
                    LogOut
                  </Nav.Link>
                </Nav>
                  :

                <Nav className="me-auto">
                  <Nav.Link
                   onClick={async () => {
                    Signup()

                      }}
                  >
                    Signup
                  </Nav.Link>
                  <Nav.Link
                  onClick={async () => {
                        LogIn()
                      }}
                  >
                    LogIn
                  </Nav.Link>
                </Nav>

              }
            
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
    }
  }
