import React from "react";
// import Logo from "../../components/Logo/Logo";
import CreateInterview from "../../components/Interviewing/CreateInterview";

export default class CreateAnInterview extends React.Component {
  render() {
    return (
      <>
        <h1>{this.props.userId} CreateInterview</h1>
        <CreateInterview huntId={this.props.huntId} userId={this.props.userId} />
      </>
    );
  }
}
