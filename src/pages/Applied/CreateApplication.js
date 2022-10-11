import React, { Component } from 'react';
import './Applied.css'

class CreateApplication extends Component {

    state = {
        JobTitle:'',
        JobDescription:'',
        DateApplied:'',
        userId: this.props.userId,
    }

    handleChange = (e) => {
        const { name, value } = e.target;
    
        this.setState({ [name]: value });
    };
    
    handleSubmit = async (evt) => {
        evt.preventDefault();
    
        try {
          const data = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                JobTitle: this.state.JobTitle,
                JobDescription: this.state.JobDescription,
                DateApplied: this.state.DateApplied,
              userId: this.state.userId,
              id: this.props.huntId,
            }),
          };
    
          const fetchResponse = await fetch("/api/applied/create", data);
          if (!fetchResponse.ok) {
            console.log(fetchResponse);
          } else {
            console.log(fetchResponse);
          }
        } catch (err) {
          console.log("Create Interview error", err);
        }
      };

    render() {
      return (
        <div className="appliedDiv">
        <h1> Create An Application </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group spaceOut">
            <label>Job Title: </label>
            <input
              type="text"
              className="form-control"
              name="JobTitle"
              value={this.state.JobTitle}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group spaceOut">
            <label>Job Description:</label>
            <input
              type="text"
              className="form-control"
              name="JobDescription"
              value={this.state.JobDescription}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group spaceOut">
            <label>Date Applied</label>
            <input
              type="date"
              className="form-control"
              name="DateApplied"
              value={this.state.DateApplied}
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
  
  export default CreateApplication;