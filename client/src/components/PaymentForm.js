import React, { Component } from "react";
import {
  CardElement,
  injectStripe,
  ReactStripeElements,
} from "react-stripe-elements";

class PaymentForm extends Component {
  state = {};
  render() {
    return <div className="container"></div>;
  }
}

export default injectStripe(PaymentForm);
