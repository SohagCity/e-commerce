import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../AuthContext";

class PrivateRoute extends Component {
  static contextType = AuthContext;

  componentDidMount() {}

  render() {
    const { component: Component, roles, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(props) => {
          if (!this.context.isAuthenticated) {
            return (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              ></Redirect>
            );
          }
          if (!roles.includes(this.context.role)) {
            return (
              <Redirect
                to={{ pathname: "/", state: { from: props.location } }}
              ></Redirect>
            );
          }
          return <Component {...props}></Component>;
        }}
      ></Route>
    );
  }
}

export default PrivateRoute;
