import './App.css';
import React, { Component } from 'react';
import AuthPage from './pages/AuthPage/AuthPage';
import NavBar from './components/NavBar/NavBar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Summary from './pages/Summary/Summary'
import Interested from './pages/Interested/Interested'
import Applied from './pages/Applied/Applied'
import Interviewing from './pages/Interviewing/Interviewing'
import Accepted from './pages/Accepted/Accepted'
import Offer from './pages/Offer/Offer'
import Resume from './pages/Resume/Resume';
import InterviewQuestions from './pages/InterviewQuestions/InterviewQuestions'


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
          
          <Routes>
            
            <Route path="/summary" element={<Summary />} />
            <Route path="/interested" element={<Interested userId= {this.state.user._id} />} />
            <Route path="/applied" element={<Applied/>} />
            <Route path="/interviewing" element={<Interviewing />} />
            <Route path="/accepted" element={<Accepted />} />
            <Route path="/offer" element={<Offer />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/interviewQuestions" element={<InterviewQuestions />} />

            
            <Route path="*" element={<Navigate to="/summary" replace />} />


          </Routes>
          

          : 
          <AuthPage showLogin = {this.state.showLogin}  setUserInState={this.setUserInState} />
        
        }
    
      </div>
    );
  }
 
}






export default App;
