import React, { Component } from "react";
import axios from "axios";
import CartLocalStorage from "../components/CartLocalStorage";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      detailProduct: {},
      cart: JSON.parse(localStorage.getItem("cart")) || [],
      modalProduct: {},
      modalOpen: false,
      cartTotal: 0,
      search: "",
      filteredProducts: [],
    };
    this.onChangeSearch = this.onChangeSearch.bind(this);
  }

  componentDidMount() {
    axios.get("/product/").then((res) => {
      if (res.data.length > 0) {
        this.setState(
          () => {
            return {
              products: res.data,
              detailProduct: res.data[0],
              modalProduct: res.data[0],
              filteredProducts: res.data,
            };
          },
          () => {
            this.storeInCart();
            this.addTotal();
          }
        );
      }
    });
  }

  resetSearch = () => {
    this.setState({ search: "", filteredProducts: this.state.products });
  };

  onChangeSearch(e) {
    e.persist();

    this.setState(
      () => {
        return { search: e.target.value };
      },
      () => {
        this.searchProducts();
      }
    );
  }
  searchProducts = () => {
    let filteredProducts = this.state.products.filter((item) => {
      return (
        item.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });
    console.log(filteredProducts);
    this.setState({ filteredProducts });
  };
  storeInCart = () => {
    let cart = [...this.state.cart];
    let products = [...this.state.products];
    cart.forEach((i) => {
      const selected = products.find((item) => item._id === i._id);

      const index = products.indexOf(selected);
      const product = products[index];
      if (cart) {
        product.inCart = true;
      }
    });
    this.setState({
      products: [...products],
    });
  };

  setProducts = () => {
    let products = [...this.state.products];
    let cart = [...products.filter((item) => item.inCart === true)];
    //cart.forEach((item) => (item.inCart = false));
    for (let i = 0; i < cart.length; i++) {
      const index = products.indexOf(cart[i]);
      const product = products[index];
      product.inCart = false;
    }
    this.setState({ products: [...products] });
  };

  getItem = (_id) => {
    const product = this.state.products.find((item) => item._id === _id);
    return product;
  };

  handleDetail = (_id) => {
    const product = this.getItem(_id);
    this.setState({ detailProduct: product });
  };
  addToCart = (_id) => {
    let products = [...this.state.products];
    const index = products.indexOf(this.getItem(_id));
    const product = products[index];

    product.inCart = true;
    product.count = 1;
    product.total = product.price;

    this.setState(
      () => {
        return { products, cart: [...this.state.cart, product] };
      },
      () => {
        this.addTotal();
      }
    );
  };
  openModal = (_id) => {
    const product = this.getItem(_id);
    this.setState({ modalProduct: product, modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  increment = (_id) => {
    let cart = [...this.state.cart];
    const selected = cart.find((item) => item._id === _id);

    const index = cart.indexOf(selected);
    const product = cart[index];
    product.count++;
    product.total += product.price;

    this.setState(
      () => {
        return {
          cart: [...cart],
        };
      },
      () => {
        this.addTotal();
      }
    );
  };
  decrement = (_id) => {
    let cart = [...this.state.cart];
    const selected = cart.find((item) => item._id === _id);

    const index = cart.indexOf(selected);
    const product = cart[index];
    product.count--;

    if (product.count === 0) {
      this.removeItem(_id);
    } else {
      product.total -= product.price;
      this.setState(
        () => {
          return {
            cart: [...cart],
          };
        },
        () => {
          this.addTotal();
        }
      );
    }
  };
  removeItem = (_id) => {
    let cart = [...this.state.cart];
    cart = cart.filter((item) => item._id !== _id);

    let products = [...this.state.products];
    const index = products.indexOf(this.getItem(_id));
    let removedItem = products[index];
    removedItem.inCart = false;
    removedItem.count = 0;
    removedItem.total = 0;

    this.setState(
      () => {
        return {
          cart: [...cart],
          products: [...products],
        };
      },
      () => {
        this.addTotal();
      }
    );
  };
  clearCart = () => {
    this.setState(
      () => {
        return {
          cart: [],
        };
      },
      () => {
        this.setProducts();
        this.addTotal();
      }
    );
  };
  addTotal = () => {
    let total = 0;
    this.state.cart.map((item) => (total += item.total));
    this.setState({ cartTotal: total });
  };

  render() {
    return (
      <React.Fragment>
        <CartLocalStorage cart={[...this.state.cart]}></CartLocalStorage>
        <ProductContext.Provider
          value={{
            ...this.state,
            handleDetail: this.handleDetail,
            addToCart: this.addToCart,
            openModal: this.openModal,
            closeModal: this.closeModal,
            increment: this.increment,
            decrement: this.decrement,
            removeItem: this.removeItem,
            clearCart: this.clearCart,
            onChangeSearch: this.onChangeSearch,
            resetSearch: this.resetSearch,
            setProducts: this.setProducts,
          }}
        >
          {this.props.children}
        </ProductContext.Provider>
      </React.Fragment>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
export default ProductContext;
