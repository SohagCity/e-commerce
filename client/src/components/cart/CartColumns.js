import React, { Component } from "react";

class CartColumns extends Component {
  render() {
    return (
      <div className="container-fluid text-center d-none d-lg-block">
        <div className="row">
          <div className="col-10 mx-auto col-lg-2">
            <strong className="text-uppercase">products</strong>
          </div>

          <div className="col-10 mx-auto col-lg-2">
            <strong className="text-uppercase">name of product</strong>
          </div>

          <div className="col-10 mx-auto col-lg-2">
            <strong className="text-uppercase">price</strong>
          </div>

          <div className="col-10 mx-auto col-lg-2">
            <strong className="text-uppercase">quantity</strong>
          </div>
          {this.props.order ? null : (
            <div className="col-10 mx-auto col-lg-2">
              <strong className="text-uppercase">remove</strong>
            </div>
          )}
          <div className="col-10 mx-auto col-lg-2">
            <strong className="text-uppercase">total</strong>
          </div>
        </div>
      </div>
    );
  }
}

export default CartColumns;
