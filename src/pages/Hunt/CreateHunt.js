import React, { Component } from "react";
import './hunt.css'

class CreateHunt extends Component {

    state = {
        HuntName: '',
        userId: this.props.userId
    }

    handleChange = (e) => {
        const { name, value } = e.target
        
        this.setState({[name]: value})
    }
    


    handleSubmit = async (evt) => {
        
        evt.preventDefault();
    
    
        try {
            const data = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    HuntName: this.state.HuntName, 
                    userId: this.state.userId 
                })
    
            }
    
            const fetchResponse = await fetch('/api/hunt/create', data)
            if (!fetchResponse.ok) {
                console.log(fetchResponse)
            } else {
                console.log(fetchResponse)
            }
            
    
        } catch (err){
            console.log("Create Interest error", err)
        }
    
    }

  render() {
    return (
        <div className="huntDiv">
            <h1>Create A Job hunt</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group spaceOut">
            <label>Give A Title to Your Hunt: </label>
            <input
              type="text"
              className="form-control"
              name="HuntName"
              value = {this.state.HuntName}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit" class="btn btn-primary spaceOut">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CreateHunt;
