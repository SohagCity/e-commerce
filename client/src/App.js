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
import ProductContext from "./context";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./hocs/PrivateRoute";
import Admin from "./components/Admin";
import Checkout from "./components/Checkout";
import NonPrivateRoute from "./hocs/NonPrivateRoute";
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
      <React.Fragment>
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
            path="/checkout"
            roles={["user", "admin"]}
            component={Checkout}
          ></PrivateRoute>
          <Route component={Default}></Route>
        </Switch>
        <Modal></Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
