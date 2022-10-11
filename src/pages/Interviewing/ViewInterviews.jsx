import React, { Component } from "react";
import "./Interviewing.css";

class Interviewing extends Component {
  state = {
    interviewing: [],
  };

  async componentDidMount() {
    let getInterviews = await fetch(
      `/api/interviewing/getInterviews/${this.props.huntId}`
    );
    getInterviews = await getInterviews.json();
    this.setState({ interviewing: getInterviews });
    console.log(this.state);
  }

  render() {
    return (
      <div className="intervContainer">
        {this.state.interviewing.map((val, id) => {
          return (
            <div className="interDiv">
              <h2>Company: {val.Company}</h2>

              <h3>Job title: {val.JobTitle}</h3>
              <br />

              <p>Interview Round: {val.RoundOfInterview}</p>

              <p>Interview Date: {val.InterviewDate}</p>
              <div className="moveRight">
                <button
                  onClick={this.handleSubmit}
                  type="submit"
                  class="btn btn-primary spaceOut"
                >
                  Edit
                </button>
                <button
                  onClick={this.handleSubmit}
                  type="submit"
                  class="btn btn-danger spaceOut"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Interviewing;
