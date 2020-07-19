import React, { Component } from "react";
import { ProductConsumer } from "../Context/ProductContext";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

class ProductModal extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const { modalOpen, closeModal } = value;
          const { img, title, price } = value.modalProduct;
          return (
            <Modal centered show={modalOpen} onHide={closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center">
                <img src={img} className="img-fluid" alt="product"></img>
              </Modal.Body>
              <Modal.Footer>
                <h5 className="text-muted text-left">price : £ {price}</h5>

                <Link to="/cart">
                  <Button variant="secondary" onClick={closeModal}>
                    Go to Cart{" "}
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="primary" onClick={closeModal}>
                    Continue Shopping
                  </Button>
                </Link>
              </Modal.Footer>
            </Modal>
          );
        }}
      </ProductConsumer>
    );
  }
}

export default ProductModal;
