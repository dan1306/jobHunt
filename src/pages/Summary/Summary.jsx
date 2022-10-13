import React, { Component } from "react";
import Summary from "../../components/Summary/Summary";

class Summarize extends Component {
  render() {
    return (
      <>
        <h1>{this.props.userId} Summarize</h1>

        <Summary huntId={this.props.huntId} userId={this.props.userId} />
      </>
    );
  }
}

export default Summarize;
