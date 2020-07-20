import React from "react";
import { CardElement } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#000000",
      background: "#000000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#000000" },
      "::placeholder": { color: "#A9A9A9" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

function CardSection() {
  return (
    <fieldset className="FormGroup">
      <div className="FormRow">
        <CardElement className="border p-3" options={CARD_ELEMENT_OPTIONS} />
      </div>
    </fieldset>
  );
}

export default CardSection;
