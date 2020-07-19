import React, { Component } from "react";
import CartItem from "./CartItem";

class CartList extends Component {
  render() {
    return (
      <div className="container-fluid">
        {this.props.value.map((item) => {
          return (
            <CartItem
              key={item._id}
              item={item}
              order={this.props.order}
            ></CartItem>
          );
        })}
      </div>
    );
  }
}

export default CartList;
