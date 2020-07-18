import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import AuthService from "../Services/AuthService";
import { Link } from "react-router-dom";

class Register extends Component {
  state = {
    user: { username: "", password: "", role: "user" },
    message: "",
  };

  onChangeUserName = (e) => {
    e.preventDefault();
    const user = this.state.user;
    user.username = e.target.value;
    this.setState({
      user,
    });
    console.log(this.state.user);
  };

  onChangePassword = (e) => {
    const user = this.state.user;
    user.password = e.target.value;
    this.setState({
      user,
    });
  };
  resetForm = () => {
    const user = this.state.user;
    user.username = "";
    user.password = "";
    //user.role = "";
    this.setState({ user });
  };

  onSubmit = (e) => {
    e.preventDefault();
    AuthService.register(this.state.user).then((data) => {
      const { message } = data;
      this.setState({ message });
      if (message) {
        this.resetForm();
      } else {
        this.props.history.push("/login");
      }
      //
    });
  };
  render() {
    return (
      <div className="container">
        <h1
          align="center"
          className="text-title col-10 mx-auto my-2 text-center"
        >
          Register
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
              value={this.state.user.username}
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
              value={this.state.user.password}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Text className="text-muted">
            Already a member? <Link to="/login"> Sign In.</Link>
          </Form.Text>
          {/*<Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
</Form.Group>*/}
          <div className="text-center">
            <Button variant="primary" type="submit">
              Register
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Register;
