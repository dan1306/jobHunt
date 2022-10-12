import React from "react";
// import Logo from "../../components/Logo/Logo";
import ViewOffers from "../../components/Offer/ViewOffers";

export default class ViewAllOffers extends React.Component {
  render() {
    return (
      <>
        <h1>{this.props.userId} ViewAllOffers</h1>
        <ViewOffers huntId={this.props.huntId} userId={this.props.userId} />
      </>
    );
  }
}
