import React from "react";
// import Logo from "../../components/Logo/Logo";
import ViewApplied from "../../components/Applied/ViewApplied";

export default class viewApplication extends React.Component {
  render() {
    return (
      <>
        <h1>{this.props.userId} </h1>
        <ViewApplied huntId={this.props.huntId} userId={this.props.userId} />
      </>
    );
  }
}
