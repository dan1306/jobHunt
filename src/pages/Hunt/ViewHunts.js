import React, { Component } from "react";

class VieweHunts extends Component {
  state = {
    huntList: [],
    userId: this.props.userId,
  };

  async componentDidMount() {
    try {
      let jwt = localStorage.getItem("token");
      console.log(jwt);

      let getHunts = await fetch("/api/hunt/gethunt", {
        headers: { Authorization: "Bearer " + jwt },
      });
      console.log(getHunts);
      getHunts = await getHunts.json();
      this.setState({ huntList: getHunts });
    } catch (err) {
      console.log(err);
    }
  }

  chosenHunt = async (n) => {

    let selId = this.state.huntList[n]._id
    
    this.props.handleChosenHunt(selId)
  }

  

  render() {
    return (
      <>
        {this.state.huntList.map((val, id) => {
          return (
            <div className="huntDiv">
              {val.HuntName}
              <button onClick={() => {
                this.chosenHunt(id)
              }} class="btn btn-primary spaceOut">choose</button>
            </div>
          );
        })}
      </>
    );
  }
}

export default VieweHunts;
