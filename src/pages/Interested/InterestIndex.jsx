import React, { Component } from 'react';
import './Interested.css'
import { Route, Routes, Navigate } from 'react-router-dom';



class InterestedIndex extends Component {

    state = {

        interestedJobs: []

    }
   
    async componentDidMount() {
        let getInterest = await fetch('/api/interested/getInterests')
        getInterest = await getInterest.json()
        this.setState({interestedJobs: getInterest})
    }

    handleDelete = (e) => {

        console.log(e)
        
    }

    render() {
        return (
            <>
                {
                    this.state.interestedJobs.map((val) => {

                        return (
                            <div className='interestdivs'>
                                <h1>
                                    {val.JobTitle}
                                </h1>
                                <p>
                                    
                                {val.JobDescription}
                                </p>


                                <button className='btn btn-danger spaceout' onClick={() => {
                                    
                                    
                                }}>
                                    Delete
                                </button>
                                
                            </div>


                        )
                    })
                }

  
            </>
        )
    }

} 



export default InterestedIndex;