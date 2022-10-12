import React, { Component } from "react";
import "./Interviewing.css";

class Interviewing extends Component {
  state = {
    interviewing: [],
    editId: null,
    RoundOfInterview: '',
    InterviewDate:''
  };

  async componentDidMount() {
    let getInterviews = await fetch(
      `/api/interviewing/getInterviews/${this.props.huntId}`
    );
    getInterviews = await getInterviews.json();
    this.setState({ interviewing: getInterviews });
    console.log(this.state);
  }

  handleEdit = async (n) => {
    await this.setState({
      editId: this.state.interviewing[n]["_id"],
      RoundOfInterview: this.state.interviewing[n]["RoundOfInterview"],
      InterviewDate: this.state.interviewing[n]["InterviewDate"],
      editIntState: n
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: this.state.editId,
          RoundOfInterview: this.state.RoundOfInterview,
          InterviewDate: this.state.InterviewDate
        }),
      };

      const fetchResponse = await fetch("api/interviewing/edit", data);
      if (!fetchResponse.ok) {
        console.log(fetchResponse);
        // await this.setState({editId: `Fields can't be empty`, classColor: 'error-message' })
      } else {
        console.log(fetchResponse);
        let newArr = this.state.interviewing
        // console.log(newArr[])
        newArr[this.state.editIntState]['InterviewDate'] = this.state.InterviewDate
        newArr[this.state.editIntState]['RoundOfInterview'] = this.state.RoundOfInterview
        await this.setState({ editId: null,  interviewing: newArr});
      }
    } catch (err) {
      console.log("Create Interest error", err);
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  

  render() {
    return (
      <>
        {this.state.editId ? (
          <div className="interviewDiv">
            <form>
              <div className="form-group spaceOut">
                <label>Round Of Interview: </label>
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
                <label>Interview Date </label>
                <input
                  type="date"
                  className="form-control"
                  name="InterviewDate"
                  value={this.state.InterviewDate}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <button
                onClick={this.handleSubmit}
                type="submit"
                class="btn btn-primary spaceOut"
              >
                Submit
              </button>
            </form>
          </div>
        ) : (
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
                      onClick={() => { this.handleEdit(id) }}
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
        )}
      </>
    );
  }
}

export default Interviewing;
