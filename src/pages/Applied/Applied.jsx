import React, { Component } from 'react';

class Applied extends Component {

  state = {
    applications: []
  }

  async componentDidMount() {
    let getAppliedJobs = await fetch(`/api/applied/getAppliedJobs/${this.props.huntId}`)
    getAppliedJobs = await getAppliedJobs.json()
    this.setState({ applications: getAppliedJobs })
    console.log(this.state)
}

    render() {
      return (
        <>
        <h1>hiasdad</h1>
      {
          this.state.applications.map((val, id) => {
              return (
                  <div className='applicationsDiv'>
                      
                      {val.JobTitle}
                      <br/>
                      {val.DateApplied}
                      <br/>
                      {val.JobDescription}
                  </div>
              )
          })
      }

</>       );
    }
  }
  
  export default Applied;