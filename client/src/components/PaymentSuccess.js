import React, { Component } from "react";

class PaymentSuccess extends Component {
  state = {};
  componentDidMount() {
    const timer = setTimeout(() => {
      this.props.history.push("/");
    }, 4000);
    return () => clearTimeout(timer);
  }
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <h1
            className="text-title col-10 mx-auto my-2 text-center"
            style={{ color: "#006400" }}
          >
            Your Payment was successfull
          </h1>
        </div>
      </div>
    );
  }
}

export default PaymentSuccess;
