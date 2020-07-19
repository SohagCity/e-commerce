import React from "react";
import "react-credit-cards/lib/styles.scss";
import "../App.css";
import { Form, Col, Button } from "react-bootstrap";
import ProductContext from "../Context/ProductContext";
import axios from "axios";
import EmptyCart from "./cart/EmptyCart";

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

    cvv: "",
    expiry: "",
    name: "",
    number: "",

    validated: false,
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      const payment = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address:
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
        card: {
          name: this.state.name,
          number: this.state.number,
          expiry: this.state.expiry,
          cvv: this.state.cvv,
        },
        total: this.context.cartTotal,
        products: [...this.context.cart],
      };
      console.log(payment);
      axios
        .post("/user/paymentLogs/add", payment)
        .then((res) => console.log(res.data));
      this.context.setProducts();
      this.props.history.push("/paymentSuccess");
    }
    this.setState({ validated: true });
  };
  render() {
    return (
      <div className="container">
        {this.context.products.length === 0 ? (
          <EmptyCart></EmptyCart>
        ) : (
          <div>
            <h1 className="text-title col-10 mx-auto my-2 text-center">
              Checkout
            </h1>
            <Form
              noValidate
              validated={this.state.validated}
              onSubmit={this.onSubmit}
            >
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    required
                    name="firstName"
                    onChange={this.handleInputChange}
                    placeholder="Enter First Name"
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    required
                    name="lastName"
                    onChange={this.handleInputChange}
                    placeholder="Enter Last Name"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  required
                  name="address1"
                  onChange={this.handleInputChange}
                  placeholder="1234 Main St"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Address 2 </Form.Label>
                <Form.Label className="text-muted">(optional)</Form.Label>

                <Form.Control
                  name="address2"
                  onChange={this.handleInputChange}
                  placeholder="Apartment, studio, or floor"
                />
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    required
                    name="city"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    required
                    name="country"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Post Code</Form.Label>
                  <Form.Control
                    required
                    name="postCode"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}></Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Name on Card</Form.Label>
                  <Form.Control
                    required
                    name="name"
                    onChange={this.handleInputChange}
                    placeholder="Enter name"
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    required
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 16);
                    }}
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
                    required
                    name="expiry"
                    onChange={this.handleInputChange}
                    type="date"
                  />
                </Form.Group>
                <Form.Group as={Col} xs={2}></Form.Group>
                <Form.Group as={Col} xs={2}>
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    required
                    name="cvv"
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 3);
                    }}
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
        )}
      </div>
    );
  }
}
