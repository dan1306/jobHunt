import React from "react";
// import Logo from "../../components/Logo/Logo";
import CreateOffer from "../../components/Offer/CreateOffer";

export default class CreateAnOffer extends React.Component {
  render() {
    return (
      <>
        <h1>{this.props.userId} CreateOffer</h1>
        <CreateOffer huntId={this.props.huntId} userId={this.props.userId} />
      </>
    );
  }
}
