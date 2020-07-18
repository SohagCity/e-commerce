import React, { Component } from "react";
import AuthContext from "../AuthContext";
import { Form, Button } from "react-bootstrap";
import AuthService from "../Services/AuthService";
import { Link } from "react-router-dom";

class Login extends Component {
  static contextType = AuthContext;

  state = {
    user: { username: "", password: "" },
    message: "",
  };

  onChangeUserName = (e) => {
    const user = this.state.user;
    user.username = e.target.value;
    this.setState({
      user,
    });
  };

  onChangePassword = (e) => {
    const user = this.state.user;
    user.password = e.target.value;
    this.setState({
      user,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    AuthService.login(this.state.user).then((data) => {
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        this.context.setUser(user);
        this.context.setIsAuthenticated(isAuthenticated);
        this.props.history.push("/");
      } else {
        this.setState({ message });
      }
    });
  };
  render() {
    return (
      <div className="container">
        <h1
          align="center"
          className="text-title col-10 mx-auto my-2 text-center"
        >
          Login
        </h1>
        {this.state.message ? (
          <h3 style={{ color: "#FF0000" }}>
            There has been an error, try again
          </h3>
        ) : null}
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={this.onChangeUserName}
              type="email"
              placeholder="Enter email"
            />
            {/*<Form.Text className="text-muted">
              We'll never share your email with anyone else.
    </Form.Text> */}
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={this.onChangePassword}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Text className="text-muted">
            Not a member?<Link to="/register"> Join Us.</Link>
          </Form.Text>
          {/*<Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
</Form.Group>*/}
          <div className="text-center">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Login;
