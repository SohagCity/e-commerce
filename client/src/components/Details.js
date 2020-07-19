import React, { Component } from "react";
import { ProductConsumer } from "../Context/ProductContext";
import { Button } from "react-bootstrap";

export default class Navbar extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const {
            _id,
            company,
            img,
            info,
            price,
            title,
            inCart,
          } = value.detailProduct;
          return (
            <div className="container py-3">
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-3">
                  <h1>{title}</h1>
                </div>
              </div>

              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                  <img src={img} className="img-fluid" alt="product"></img>
                </div>

                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h2>model : {title}</h2>
                  <h4 className="text-uppercase text-muted mt-3 mb-2">
                    made by : {company}
                  </h4>

                  <h4 className="text-blue">
                    <strong>
                      price : <span>£</span> {price}
                    </strong>
                  </h4>

                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    some info about product:
                  </p>
                  <p className="text-muted lead">{info}</p>
                  <div className="text-center">
                    <Button
                      color="primary"
                      size="lg"
                      disabled={inCart ? true : false}
                      onClick={() => {
                        value.addToCart(_id);
                        value.openModal(_id);
                      }}
                    >
                      {inCart ? <p>in Cart</p> : <p>Add to Cart</p>}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
