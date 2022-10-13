import React from "react";
import ViewJobHunt from "../../components/JobHunt/ViewHunts";

export default class viewHunts extends React.Component {

  componentDidMount() {
    
  }
  
  render() {
    return (
      <>
        <h1>{this.props.userId} ViewJobHunt</h1>
        <ViewJobHunt  handleChosenHunt={this.props.handleChosenHunt} userId={this.props.userId} />
      </>
    );
  }
}
