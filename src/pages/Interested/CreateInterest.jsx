import React from "react";
// import Logo from "../../components/Logo/Logo";
import CreateAnInterest from "../../components/InterestedJobs/CreateInterest";

export default class CreateApplication extends React.Component {
  render() {
    return (
      <>
        <h1>{this.props.userId}  CreateApplication</h1>
        <CreateAnInterest huntId={this.props.huntId} userId={this.props.userId} />
      </>
    );
  }
}
