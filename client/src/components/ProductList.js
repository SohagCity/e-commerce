import React, { Component } from "react";
import Product from "./Product";
import { ProductConsumer } from "../context";

class ProductList extends Component {
  render() {
    return (
      <div className="container">
        <h1
          align="center"
          className="text-title col-10 mx-auto my-2 text-center"
        >
          Product List
        </h1>
        <div className="row">
          <ProductConsumer>
            {(value) => {
              return value.filteredProducts.map((product) => {
                return <Product key={product._id} product={product}></Product>;
              });
            }}
          </ProductConsumer>
        </div>
      </div>
    );
  }
}
export default ProductList;
