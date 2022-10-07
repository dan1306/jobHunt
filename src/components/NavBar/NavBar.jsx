import { Component } from "react";

export default class NavBar extends Component {
    render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar</a>
            <div>
            <div class="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item active">
                    <a className="nav-link">LogIn</a>
                </li>
                <li class="nav-item">
                    <a className="nav-link" href="#">Signup</a>
                </li>
                </ul>
            </div> 
            </div>
        </nav>

        
    );
    }
  }
