import React, { Component } from "react";

class PaymentSuccess extends Component {
  state = {};
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <h1 className="text-title col-10 mx-auto my-2 text-center">
            Your Payment was successfull
          </h1>
        </div>
      </div>
    );
  }
}

export default PaymentSuccess;
