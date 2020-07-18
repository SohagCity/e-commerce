import React, { Component } from "react";

class EmptyCart extends Component {
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <h1 className="text-title col-10 mx-auto my-2 text-center">
            Your Cart is Currently Empty
          </h1>
        </div>
      </div>
    );
  }
}

export default EmptyCart;
