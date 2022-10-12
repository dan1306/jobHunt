import React from "react";
// import Logo from "../../components/Logo/Logo";
import CreateApplied from "../../components/Applied/CreateApplied";

export default class CreateApplication extends React.Component {
  render() {
    return (
      <>
        <h1>{this.props.userId} </h1>
        <CreateApplied huntId={this.props.huntId} userId={this.props.userId} />
      </>
    );
  }
}
