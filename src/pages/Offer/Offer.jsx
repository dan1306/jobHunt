import React, { Component } from "react";

class Offer extends Component {
  state = {
    offers: [],
  };

  async componentDidMount() {
    let getOffers = await fetch(`/api/offer/getOffers/${this.props.huntId}`);
    getOffers = await getOffers.json();
    this.setState({ offers: getOffers });
    console.log(this.state);
  }

  render() {
    return (
      <div className="offerContainer">
        {this.state.offers.map((val, id) => {
          return (
            <div className="offerDiv">
              <h1>Job Title: {val.JobTitle}</h1>
              <br />
              <h3>Pay Per Year: ${val.PayPerYear}</h3>
              <br />
              <p>Start Date: {val.starDate}</p>
              <div className="moveRight">
                <button
                  onClick={this.handleSubmit}
                  type="submit"
                  class="btn btn-success spaceOut"
                >
                  Accept
                </button>
                <button
                  onClick={this.handleSubmit}
                  type="submit"
                  class="btn btn-primary spaceOut"
                >
                  Edit
                </button>
                <button
                  onClick={this.handleSubmit}
                  type="submit"
                  class="btn btn-danger spaceOut"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Offer;
