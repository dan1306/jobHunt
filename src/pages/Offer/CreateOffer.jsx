import React, { Component } from 'react';
import './Offer.css'
import { Link } from "react-router-dom";


class CreateOffer extends Component {

  state = {
    JobTitle: '',
    PayPerYear: 0,
    starDate: null,
    userId: this.props.userId,
    submitted: false,
    error: '',
    classColor:""
    
  }

  handleChange = (e) => {
    const { name, value } = e.target
    
    this.setState({[name]: value})
  }




handleSubmit = async (evt) => {
        
    evt.preventDefault();


    try {
        const data = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                JobTitle: this.state.JobTitle, 
              PayPerYear: this.state.PayPerYear,
              starDate: this.state.starDate,
              userId: this.state.userId,
              id: this.props.huntId

            })

        }

        const fetchResponse = await fetch('/api/offer/create', data)
        if (!fetchResponse.ok) {
          console.log(fetchResponse)
          await this.setState({
            error: `Fields can't be empty`,
            classColor: "error-message",
          });
        } else {
          console.log(fetchResponse)
          await this.setState({
            error: `Offer Added`,
            classColor: "sucess-message",
            submitted: true,
          });
        }
        

    } catch (err){
        console.log("Create Interest error", err)
    }

}

    render() {
      return (
        <div className='offerDiv'>
          <h1> Create An Offer </h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group spaceOut">
                        <label >Job Title: </label>
                        <input
                            type="text"
                            className="form-control"
                            name='JobTitle'
                            value={this.state.JobTitle}
                      onChange={this.handleChange}
                      required
                          />
            </div>
            <div className="form-group spaceOut">
                        <label >Pay Per year:</label>
                        <input
                            type="number"
                            className="form-control"
                            name='PayPerYear'
                            value={this.state.PayPerYear}
                onChange={this.handleChange}
                required
                          />
            </div>
            <div className="form-group spaceOut">
                        <label >Start Date:</label>
                        <input
                            type="date"
                            className="form-control"
                            name='starDate'
                            value={this.state.starDate}
                onChange={this.handleChange}
                required
                          />
            </div>
            {
              this.state.submitted ? (
                <div className="spaceOut">
              <Link to="/viewOffers">
                <button className="btn btn-success ">
                  Return To Offer List
                </button>
              </Link>
            </div>

                
              )
                :
                (
                  <div className="spaceout">
                    
                  <button type = "submit" class="btn btn-primary spaceOut">Submit</button>
          </div>
                )
                
            }

          </form>
          <div className="spaceout text-center">
          <p className={this.state.classColor}>&nbsp;{this.state.error}</p>
        </div>
        </div>
      );
    }
  }
  
  export default CreateOffer;