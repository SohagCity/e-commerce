import React from "react";
import "react-credit-cards/lib/styles.scss";
import "../App.css";
import { Form, Col, Button } from "react-bootstrap";
import ProductContext from "../context";

export default class Checkout extends React.Component {
  static contextType = ProductContext;

  state = {
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    postCode: "",

    cvc: "",
    expiry: "",
    name: "",
    number: "",

    fullName: "",
    fullAddress: "",
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const card = {
      name: this.state.name,
      number: this.state.number,
      expiry: this.state.expiry,
      cvc: this.state.card,
    };
    const payment = {
      fullName: this.state.firstName + " " + this.state.lastName,
      fullAddress:
        this.state.address1 +
        ", " +
        this.state.address2 +
        ", " +
        this.state.city +
        ", " +
        this.state.country +
        ", " +
        this.state.postCode +
        ", ",
      card: card,
    };
    console.log(payment);
  };
  render() {
    return (
      <div className="container">
        <h1 className="text-title col-10 mx-auto my-2 text-center">Checkout</h1>
        <Form onSubmit={this.onSubmit}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                onChange={this.handleInputChange}
                placeholder="Enter First Name"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                onChange={this.handleInputChange}
                placeholder="Enter Last Name"
              />
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="address1"
              onChange={this.handleInputChange}
              placeholder="1234 Main St"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address 2 </Form.Label>
            <Form.Label className="text-muted">(optional)</Form.Label>

            <Form.Control
              name="address1"
              onChange={this.handleInputChange}
              placeholder="Apartment, studio, or floor"
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>City</Form.Label>
              <Form.Control name="city" onChange={this.handleInputChange} />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Country</Form.Label>
              <Form.Control name="city" onChange={this.handleInputChange} />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Post Code</Form.Label>
              <Form.Control name="postCode" onChange={this.handleInputChange} />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}></Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Name on Card</Form.Label>
              <Form.Control
                name="name"
                onChange={this.handleInputChange}
                placeholder="Enter name"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                name="number"
                onChange={this.handleInputChange}
                type="number"
                placeholder="4111 1111 1111 1111"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} xs={4}>
              <Form.Label>Expiration Date </Form.Label>
              <Form.Label className="text-muted">
                (day will be ignored)
              </Form.Label>
              <Form.Control
                name="expiry"
                onChange={this.handleInputChange}
                type="date"
              />
            </Form.Group>
            <Form.Group as={Col} xs={2}></Form.Group>
            <Form.Group as={Col} xs={2}>
              <Form.Label>CVV</Form.Label>
              <Form.Control
                name="cvv"
                onChange={this.handleInputChange}
                type="number"
                placeholder="123"
              />
            </Form.Group>
          </Form.Row>

          <h3 className="text-center">
            <span> Total :</span>
            <strong>£ {this.context.cartTotal}</strong>
          </h3>

          <Form.Row>
            <Form.Group as={Col}></Form.Group>
          </Form.Row>
          <div className="text-center">
            <Button variant="primary" size="lg" type="submit" block>
              Pay
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
