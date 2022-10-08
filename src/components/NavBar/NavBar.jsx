import { Component } from "react";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

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
                    <NavDropdown.Item>Interested</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.2">
                      Applied
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">Interviewing</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Offer
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Accepted
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                Summary
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
