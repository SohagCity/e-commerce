import React, { Component } from "react";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";

class CartItem extends Component {
  state = {
    hover: false,
  };
  render() {
    const { _id, title, img, price, total, count } = this.props.item;
    const { increment, decrement, removeItem, handleDetail } = this.props.value;
    return (
      <div className="row my-1 text-capitalize text-center">
        <div
          className="col-10 mx-auto col-lg-2"
          onClick={() => {
            handleDetail(_id);
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

        <div className="col-10 mx-auto col-lg-2">
          <span className="d-lg-none">product : </span> {title}
        </div>

        <div className="col-10 mx-auto col-lg-2">
          <span className="d-lg-none">price : </span> {price}
        </div>

        <div className="col-10 mx-auto col-lg-2">
          <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
            <div className="d-flex justify-content-center">
              <span
                className="btn btn-black mx-1"
                onClick={() => decrement(_id)}
              >
                -
              </span>
              <span className="btn btn-black mx-1">{count}</span>
              <span
                className="btn btn-black mx-1"
                onClick={() => increment(_id)}
              >
                +
              </span>
            </div>
          </div>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <span className="btn btn-black mx-1" onClick={() => removeItem(_id)}>
            <RemoveShoppingCartIcon></RemoveShoppingCartIcon>
          </span>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <strong>item total : £ {total}</strong>
        </div>
      </div>
    );
  }
}

export default CartItem;
