import React, { Component } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { AuthConsumer } from "../Context/AuthContext";
import Checkout from "./Checkout";

const stripePromise = loadStripe(
  "pk_test_51H6ysfLqFfin0FkvsWhY9oyyqDVzk2IUahYgcFCBu4KmmX2N6JMbjQFaDT67dBqB6L3A472EvNmY0tQfLWGQ0I9w00hMtzDsvn"
);

class Payment extends Component {
  render() {
    return (
      <Elements stripe={stripePromise}>
        <AuthConsumer>
          {(value) => {
            return <Checkout value={value}></Checkout>;
          }}
        </AuthConsumer>
      </Elements>
    );
  }
}
export default Payment;
