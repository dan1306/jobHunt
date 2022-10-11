import React, { Component } from 'react';

class Offer extends Component {

    state = {
        offers: []
    }

    async componentDidMount() {
        let getOffers = await fetch(`/api/offer/getOffers/${this.props.huntId}`)
        getOffers = await getOffers.json()
        this.setState({ offers: getOffers })
        console.log(this.state)
    }


    render() {
      return (
          <>
              {
                  this.state.offers.map((val, id) => {
                      return (
                          <div className='offerDiv'>
                              
                              {val.JobTitle}
                              <br/>
                              {val.PayPerYear}
                              <br/>
                              {val.starDate}
                          </div>
                      )
                  })
              }

        </>
      );
    }
  }
  
  export default Offer;