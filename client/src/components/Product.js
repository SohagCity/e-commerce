import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../Context/ProductContext";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Card, Button } from "react-bootstrap";

export default class ProductList extends Component {
  state = {
    hover: false,
  };
  render() {
    const { _id, title, img, price, inCart } = this.props.product;
    return (
      <div className="col-9 mx-auto col-md-6 col-lg-3 my-3">
        <ProductConsumer>
          {(value) => {
            return (
              <Card style={{ width: "15rem" }}>
                <Link to="/details">
                  <Card.Img
                    variant="top"
                    src={img}
                    alt="product"
                    className="card-img-top"
                    onMouseOut={() => this.setState({ hovered: false })}
                    onMouseOver={() => this.setState({ hovered: true })}
                    onClick={() => {
                      value.handleDetail(_id);
                    }}
                    style={{
                      transform: `${
                        this.state.hovered ? "scale(1,1)" : "scale(0.7,0.7)"
                      }`,
                    }}
                  ></Card.Img>
                </Link>
                <div className="text-center">
                  <Card.Title>{title}</Card.Title>
                  <Card.Subtitle>
                    <span className="mr-1">£</span>
                    {price}
                  </Card.Subtitle>
                  <Button
                    size="lg"
                    block
                    variant="primary"
                    disabled={inCart ? true : false}
                    onClick={() => {
                      value.addToCart(_id);
                      value.openModal(_id);
                    }}
                  >
                    {inCart ? (
                      <p>in Cart</p>
                    ) : (
                      <AddShoppingCartIcon fontSize="large"></AddShoppingCartIcon>
                    )}
                  </Button>
                </div>
              </Card>
            );
          }}
        </ProductConsumer>
      </div>
    );
  }
} /*
<ProductConsumer>
  {(value) => {
    return (
      <div>
        <div
          className="img-container p-5"
          onClick={() => {
            value.handleDetail(_id);
          }}
        >
          <Link to="/details">
            <img
              src={img}
              alt="product"
              className="card-img-top"
              onMouseOut={() => this.setState({ hovered: false })}
              onMouseOver={() => this.setState({ hovered: true })}
              style={{
                transform: `${
                  this.state.hovered ? "scale(1.5,1.5)" : "scale(1,1)"
                }`,
              }}
            ></img>
          </Link>
        </div>

        <div className="card-footer d-flex justify-content-between">
          <p className="align-self-center mb-0">{title}</p>
          <h5 className="font-italic mb-0">
            <span className="mr-1">£</span>
            {price}
          </h5>
        </div>
        <div className="d-flex justify-content-center">
          <Button
            variant="contained"
            color="primary"
            disabled={inCart ? true : false}
            onClick={() => {
              value.addToCart(_id);
              value.openModal(_id);
            }}
          >
            {inCart ? (
              <p>in Cart</p>
            ) : (
              <AddShoppingCartIcon></AddShoppingCartIcon>
            )}
          </Button>
        </div>
      </div>
    );
  }}
</ProductConsumer>;
*/
