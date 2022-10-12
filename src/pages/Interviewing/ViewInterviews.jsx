import React from "react";
// import Logo from "../../components/Logo/Logo";
import ViewInterviews from "../../components/Interviewing/ViewInterviews";

export default class ViewAllInterviews extends React.Component {
  render() {
    return (
      <>
        <h1>{this.props.userId} ViewInterviews</h1>
        <ViewInterviews huntId={this.props.huntId} userId={this.props.userId} />
      </>
    );
  }
}
