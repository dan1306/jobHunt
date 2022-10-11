import React, { Component } from "react";
import './Interviewing.css'

class CreateInterview extends Component {
  state = {
    Company: "",
    JobTitle: "",
    RoundOfInterview: "",
    InterviewDate: "",
    userId: this.props.userId,
  };

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
          Company: this.state.Company,
          JobTitle: this.state.JobTitle,
          RoundOfInterview: this.state.RoundOfInterview,
          InterviewDate: this.state.InterviewDate,
          userId: this.state.userId,
          id: this.props.huntId,
        }),
      };

      const fetchResponse = await fetch("/api/interviewing/create", data);
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
      <div className="interviewDiv">
        <h1> Create An Interview </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group spaceOut">
            <label>Company Name: </label>
            <input
              type="text"
              className="form-control"
              name="Company"
              value={this.state.Company}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group spaceOut">
            <label>Job Title:</label>
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
            <label>Round Of Interview:</label>
            <input
              type="text"
              className="form-control"
              name="RoundOfInterview"
              value={this.state.RoundOfInterview}
              onChange={this.handleChange}
              required
            />
                </div>
                <div className="form-group spaceOut">
            <label>Interview Date:</label>
            <input
              type="date"
              className="form-control"
              name="InterviewDate"
              value={this.state.InterviewDate}
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

export default CreateInterview;
