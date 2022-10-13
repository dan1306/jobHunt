import React, { Component } from "react";

class Offer extends Component {
  state = {
    offers: null,
    offerAccepted: false,
    id: null,
  };

  async componentDidMount() {
    let getOffers = await fetch(`/api/offer/getOffers/${this.props.huntId}`);
    getOffers = await getOffers.json();

    for (let i = 0; i < getOffers.length; i++) {
      if (getOffers[i]["Accepted"]) {
        await this.setState({
          offers: getOffers[i],
          offerAccepted: true,
          id: getOffers[i]["_id"],
        });
        break;
      }
    }
  }

  declineoffer = async (id) => {
    try {
      const data = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
        }),
      };

      const fetchResponse = await fetch("/api/offer/declineOffer", data);
      if (fetchResponse.ok) {
        console.log(fetchResponse, "success");
        await this.setState({ offers: null, offerAccepted: false });
      } else {
        console.log(fetchResponse);
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div>
        {this.props.huntId}
        {this.state.offerAccepted["Company"]}
        {this.state.offerAccepted ? (
          <div className="App-header">
            <h1>{this.state.offers["Company"]}</h1>
            <h2>{this.state.offers["JobTitle"]} </h2>
            <h3>{this.state.offers["PayPerYear"]} </h3>
            <h4> {this.state.offers["starDate"]} </h4>
            <button
              className="btn btn-danger btn-space"
              onClick={() => {
                this.declineoffer(this.state.id);
              }}
            >
              Decline
            </button>
          </div>
        ) : (
          <>
            <h1>No offer Has been Accepted</h1>
          </>
        )}
      </div>
    );
  }
}

export default Offer;
