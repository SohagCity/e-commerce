import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";
import AuthService from "../Services/AuthService";
import { Link } from "react-router-dom";

class Register extends Component {
  state = {
    user: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      role: "user",
    },
    message: null,
    validated: false,
  };
  onChangeFirstName = (e) => {
    e.preventDefault();
    const user = this.state.user;
    user.firstName = e.target.value;
    this.setState({
      user,
    });
    console.log(this.state.user);
  };

  onChangeLastName = (e) => {
    e.preventDefault();
    const user = this.state.user;
    user.lastName = e.target.value;
    this.setState({
      user,
    });
    console.log(this.state.user);
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
    this.setState({ user });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      AuthService.register(this.state.user).then((data) => {
        const { message } = data;
        this.setState({ message });
        if (message) {
          this.resetForm();
        } else {
          this.props.history.push("/login");
        }
      });
    }
    this.setState({ validated: true });
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
        <Form
          noValidate
          validated={this.state.validated}
          onSubmit={this.onSubmit}
        >
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                name="firstName"
                onChange={this.onChangeFirstName}
                placeholder="Enter First Name"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                name="lastName"
                onChange={this.onChangeLastName}
                placeholder="Enter Last Name"
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              name="username"
              onChange={this.onChangeUserName}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              onChange={this.onChangePassword}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Text className="text-muted">
            Already a member? <Link to="/login"> Sign In.</Link>
          </Form.Text>
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
