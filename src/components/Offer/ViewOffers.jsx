import React, { Component } from "react";
import "./Offer.css";

class Offer extends Component {
  state = {
    offers: [],
    editId: null,
    starDate: "",
    PayPerYear: "",
    editIntState: null,
    error: "",
    classColor: "",
  };

  async componentDidMount() {
    let getOffers = await fetch(`/api/offer/getOffers/${this.props.huntId}`);
    getOffers = await getOffers.json();
    this.setState({ offers: getOffers, error: '' });
    console.log(this.state);
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleEdit = async (n) => {
    await this.setState({
      editId: this.state.offers[n]["_id"],
      starDate: this.state.offers[n]["starDate"],
      PayPerYear: this.state.offers[n]["PayPerYear"],
      editIntState: n,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!this.state.starDate || !this.state.PayPerYear) {
      await this.setState({
        error: `Fields can't be empty`,
        classColor: "error-message",
      });
    } else {
 
      try {
        const data = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: this.state.editId,
            starDate: this.state.starDate,
            PayPerYear: this.state.PayPerYear,
          }),
        };
  
        const fetchResponse = await fetch("api/offer/edit", data);
        if (!fetchResponse.ok) {
          console.log(fetchResponse);
         
        } else {
          console.log(fetchResponse);
          let newArr = this.state.offers;
          // console.log(newArr[])
          newArr[this.state.editIntState]["starDate"] = this.state.starDate;
          newArr[this.state.editIntState]["PayPerYear"] = this.state.PayPerYear;
          await this.setState({
            editId: null,
            offers: newArr,
            classColor: null,
            error: ''
          });
        }
      } catch (err) {
        console.log("Create Interest error", err);
      }
    }
    
   
  };

  handleDelete = async (n) => {
    try {
      const options = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: this.state.offers[n]["_id"],
          huntId: this.props.huntId,
        }),
      };

      const fetchResponse = await fetch("/api/offer/delete", options);
      if (!fetchResponse.ok) {
        console.log(fetchResponse);
      } else {
        console.log(fetchResponse);
        let newOfferArr = this.state.offers;
        newOfferArr.splice(n, 1);
        await this.setState({ offers: newOfferArr });
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <>
        {this.state.editId ? (
          <div className="interviewDiv">
            <form>
              <div className="form-group spaceOut">
                <label>Pay Per Year: </label>
                <input
                  type="number"
                  className="form-control"
                  name="PayPerYear"
                  value={this.state.PayPerYear}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group spaceOut">
                <label>Start Date: </label>
                <input
                  type="date"
                  className="form-control"
                  name="starDate"
                  value={this.state.starDate}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <button
                onClick={this.handleSubmit}
                type="submit"
                class="btn btn-primary spaceOut"
              >
                Submit
              </button>
            </form>
            <div className="spaceout text-center">
              <h5 className={this.state.classColor}>&nbsp;{this.state.error}</h5>
            </div>
          </div>
        ) : (
          <>
            {this.state.offers.length > 0 ? (
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
                          // onClick={this.handleSubmit}
                          type="submit"
                          class="btn btn-success spaceOut"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => {
                            this.handleEdit(id);
                          }}
                          type="submit"
                          class="btn btn-primary spaceOut"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            this.handleDelete(id);
                          }}
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
            ) : (
              <div className="offerContainer">
                <h1>No Offers To Show</h1>
              </div>
            )}
          </>
        )}
      </>
    );
  }
}

export default Offer;
