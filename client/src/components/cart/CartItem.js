import React, { Component } from "react";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../../Context/ProductContext";

class CartItem extends Component {
  state = {
    hover: false,
  };
  render() {
    const { _id, title, img, price, total, count } = this.props.item;
    return (
      <div>
        <ProductConsumer>
          {(value) => {
            return (
              <div className="row my-1 text-capitalize text-center">
                <div
                  className="col-10 mx-auto col-lg-2"
                  onClick={() => {
                    value.handleDetail(_id);
                  }}
                >
                  <Link to="/details">
                    <img
                      src={img}
                      style={{ width: "5rem", height: "5rem" }}
                      className="img-fluid"
                      alt="product"
                    ></img>
                  </Link>
                </div>

                <div className="col-10 mx-auto col-lg-2">{title}</div>

                <div className="col-10 mx-auto col-lg-2">
                  <span>£ </span> {price}
                </div>
                <div className="col-10 mx-auto col-lg-2">
                  <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                    {this.props.order ? (
                      <div className="d-flex justify-content-center">
                        {count}
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center">
                        <span
                          className="btn btn-black mx-1"
                          onClick={() => value.decrement(_id)}
                        >
                          -
                        </span>
                        <span className="btn btn-black mx-1">{count}</span>
                        <span
                          className="btn btn-black mx-1"
                          onClick={() => value.increment(_id)}
                        >
                          +
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {this.props.order ? null : (
                  <div className="col-10 mx-auto col-lg-2">
                    <span
                      className="btn btn-black mx-1"
                      onClick={() => value.removeItem(_id)}
                    >
                      <RemoveShoppingCartIcon></RemoveShoppingCartIcon>
                    </span>
                  </div>
                )}
                <div className="col-10 mx-auto col-lg-2">
                  <strong>item total : £ {total}</strong>
                </div>
              </div>
            );
          }}
        </ProductConsumer>
      </div>
    );
  }
}

export default CartItem;
