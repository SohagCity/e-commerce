import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Cart from "./components/cart/Cart";
import Modal from "./components/Modal";
import Default from "./components/Default";
import ProductContext from "./Context/ProductContext";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./hocs/PrivateRoute";
import Admin from "./components/Admin";
import Checkout from "./components/Checkout";
import NonPrivateRoute from "./hocs/NonPrivateRoute";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import PaymentSuccess from "./components/PaymentSuccess";
class App extends Component {
  static contextType = ProductContext;
  componentDidMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      this.context.resetSearch();
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }
  render() {
    return (
      <div className="page-container">
        <div className="content-wrap">
          <NavigationBar />
          <Switch>
            <Route exact path="/" component={ProductList}></Route>
            <Route path="/details" component={Details}></Route>
            <Route path="/cart" component={Cart}></Route>
            <NonPrivateRoute path="/login" component={Login}></NonPrivateRoute>
            <NonPrivateRoute
              path="/register"
              component={Register}
            ></NonPrivateRoute>
            <PrivateRoute
              path="/admin"
              roles={["admin"]}
              component={Admin}
            ></PrivateRoute>
            <PrivateRoute
              path="/profile"
              roles={["user", "admin"]}
              component={Profile}
            ></PrivateRoute>
            <Route
              path="/paymentSuccess"
              roles={["user", "admin"]}
              component={PaymentSuccess}
            ></Route>
            <Route
              path="/checkout"
              roles={["user", "admin"]}
              component={Checkout}
            ></Route>
            <Route component={Default}></Route>
          </Switch>
          <Modal></Modal>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default withRouter(App);
