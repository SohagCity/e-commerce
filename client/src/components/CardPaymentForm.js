import React from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/lib/styles.scss";
import TextField from "@material-ui/core/TextField";
import "../App.css";

export default class CardPaymentForm extends React.Component {
  state = {
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <br />
        <form
          noValidate
          autoComplete="off"
          className="text-center display-flex flex-direction-row"
        >
          <div>
            <TextField
              type="tel"
              name="number"
              placeholder="Card Number"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
              variant="outlined"
            />
            <TextField
              type="tel"
              name="name"
              placeholder="Name"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
              variant="outlined"
            />
            <TextField
              type="tel"
              name="expiry"
              placeholder="Expiry"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
              variant="outlined"
            />
            <TextField
              type="tel"
              name="cvc"
              placeholder="CVC"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
              variant="outlined"
            />
          </div>
        </form>
      </div>
    );
  }
}
