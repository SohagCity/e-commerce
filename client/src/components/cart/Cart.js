import React, { Component } from "react";
import { Button } from "react-bootstrap";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import { ProductConsumer } from "../../Context/ProductContext";
import CartList from "./CartList";
import { Link } from "react-router-dom";

class Cart extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {(value) => {
            if (value.cart.length > 0) {
              return (
                <React.Fragment>
                  <h1 className="text-title col-10 mx-auto my-2 text-center">
                    Your Cart
                  </h1>
                  <CartColumns></CartColumns>

                  <CartList value={value.cart}></CartList>
                  <div className="container">
                    <div className="row">
                      <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                        <h5>
                          <span> total :</span>
                          <strong>£ {value.cartTotal}</strong>
                        </h5>
                        <Link to="/">
                          <Button
                            className="text-uppercase mb-3 px-5"
                            color="secondary"
                            variant="outline-danger"
                            onClick={() => value.clearCart()}
                          >
                            clear
                          </Button>
                        </Link>{" "}
                        <Link to="/payment">
                          <Button
                            className="text-uppercase mb-3 px-5"
                            color="secondary"
                            variant="success"
                          >
                            checkout
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            } else {
              return <EmptyCart></EmptyCart>;
            }
          }}
        </ProductConsumer>
      </section>
    );
  }
}

export default Cart;
