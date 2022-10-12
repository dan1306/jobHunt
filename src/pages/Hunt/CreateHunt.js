import React from "react";
// import Logo from "../../components/Logo/Logo";
import CreateAJobHunt from "../../components/JobHunt/CreateHunt";

export default class viewApplication extends React.Component {
  render() {
    return (
      <>
        <h1>{this.props.userId} CreateAJobHunt</h1>
        <CreateAJobHunt userId={this.props.userId} />
      </>
    );
  }
}
