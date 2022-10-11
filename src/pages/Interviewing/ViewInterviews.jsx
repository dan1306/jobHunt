import React, { Component } from 'react';

class Interviewing extends Component {

  state = {
    interviewing: []
}

  
  async componentDidMount() {
    let getInterviews = await fetch(`/api/interviewing/getInterviews/${this.props.huntId}`)
    getInterviews = await getInterviews.json()
    this.setState({ interviewing: getInterviews })
    console.log(this.state)
}

    render() {
      return (
        <>
          <h1>hiasdad</h1>
        {
            this.state.interviewing.map((val, id) => {
                return (
                    <div className='interDiv'>
                        
                        {val.JobTitle}
                        <br/>
                        {val.Company}
                        <br/>
                        {val.InterviewDate}
                    </div>
                )
            })
        }

  </>      );
    }
  }
  
  export default Interviewing;