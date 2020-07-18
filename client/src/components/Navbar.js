import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import StoreIcon from "@material-ui/icons/Store";
import { ProductConsumer } from "../context";
import SearchIcon from "@material-ui/icons/Search";
import { Navbar, Button, Nav, NavDropdown, Form } from "react-bootstrap";
import { InputBase } from "@material-ui/core";
import AuthContext from "../AuthContext";
import AuthService from "../Services/AuthService";
import { LinkContainer } from "react-router-bootstrap";

class NavigationBar extends Component {
  static contextType = AuthContext;
  onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        this.setUser(data.user);
        this.context.setIsAuthenticated(false);
      }
    });
  };

  render() {
    return (
      <Navbar
        sticky="top"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Link to="/">
          <Navbar.Brand style={{ fontSize: "30px" }}>Corazón</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <ProductConsumer>
              {(value) => {
                return (
                  <Form inline>
                    <div className="m-1">
                      <SearchIcon />
                      <input
                        placeholder="Search…"
                        value={value.search}
                        onChange={value.onChangeSearch}
                      />
                    </div>
                  </Form>
                );
              }}
            </ProductConsumer>
          </Nav>
          <Nav>
            {this.context.isAuthenticated ? (
              <NavDropdown title="Account" id="collasible-nav-dropdown">
                <NavDropdown.Item>Profile</NavDropdown.Item>
                {this.context.user.role === "admin" ? (
                  <NavDropdown.Item>Admin</NavDropdown.Item>
                ) : null}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={this.onClickLogoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Account" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                <NavDropdown.Item href="/login"> Log in</NavDropdown.Item>
              </NavDropdown>
            )}

            <NavLink
              to="cart"
              style={{ textDecoration: "none", color: "#FFFFFF" }}
            >
              <ShoppingCartIcon fontSize="large" />
              Cart
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;
