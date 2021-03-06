import React from "react";
import "react-credit-cards/lib/styles.scss";
import "../App.css";
import { Form, Col, Button } from "react-bootstrap";
import ProductContext from "../Context/ProductContext";
import axios from "axios";
import EmptyCart from "./cart/EmptyCart";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import CardSection from "./CardSection";
import countryList from "react-select-country-list";

class Checkout extends React.Component {
  static contextType = ProductContext;
  constructor(props) {
    super(props);

    this.options = countryList().getData();

    this.state = {
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      postCode: "",

      cvv: "",
      expiry: "",
      name: "",
      number: "",

      validated: false,
      message: "",
      countries: this.options,
      country: this.options[0].value,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    //stripe
    const { stripe, elements } = this.props;

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      const cardElement = elements.getElement(CardElement);
      const paymentMethod = {
        type: "card",
        card: cardElement,
        billing_details: {
          address: {
            city: this.state.city,
            country: this.state.country,
            line1: this.state.address1,
            line2: this.state.address2,
            postal_code: this.state.postCode,
          },
          name: this.state.firstName + ", " + this.state.lastName,
        },
      };
      let amount = { amount: this.context.cartTotal * 100 };
      fetch("/payment/secret", {
        method: "post",
        body: JSON.stringify(amount),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((responseJson) => {
          var clientSecret = responseJson.client_secret;
          stripe
            .confirmCardPayment(clientSecret, {
              payment_method: paymentMethod,
            })
            .then((result) => {
              if (result.error) {
                this.setState({ message: result.error.message });
                console.log(result.error.message);
              } else {
                console.log(result);
                const paymentLog = {
                  firstName: this.state.firstName,
                  lastName: this.state.lastName,
                  total: this.context.cartTotal,
                  products: [...this.context.cart],
                };
                axios
                  .post("/user/paymentLogs/add", paymentLog)
                  .then((res) => console.log(res.data));
                if (result.paymentIntent.status === "succeeded") {
                  localStorage.clear();
                  console.log("paymentSuccess");
                  window.location = "/paymentSuccess";
                }
              }
            });
        });
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
              onSubmit={(e) => this.onSubmit(e)}
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
                    as="select"
                    value={this.state.country}
                  >
                    {this.state.countries.map((c) => {
                      return (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      );
                    })}
                  </Form.Control>
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
                <Form.Group
                  as={Col}
                  style={{
                    backgroundColor: "white",
                  }}
                ></Form.Group>
              </Form.Row>

              <label>Card Details</label>
              <CardSection />

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
                <h3 className="p-2" style={{ color: "#FF0000" }}>
                  {this.state.message}
                </h3>
              </div>
            </Form>
          </div>
        )}
      </div>
    );
  }
}
export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <Checkout stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}
