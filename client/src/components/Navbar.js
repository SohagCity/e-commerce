import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { ProductConsumer } from "../Context/ProductContext";
import SearchIcon from "@material-ui/icons/Search";
import { Navbar, Nav, NavDropdown, Form } from "react-bootstrap";
import AuthContext from "../Context/AuthContext";
import AuthService from "../Services/AuthService";

class NavigationBar extends Component {
  static contextType = AuthContext;
  onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        this.context.setUser(data.user);
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
              <>
                <NavLink to="/orders" className="nav-link">
                  Your Orders
                </NavLink>
                {this.context.user.role === "admin" ? (
                  <NavLink to="/admin" className="nav-link">
                    Admin
                  </NavLink>
                ) : null}

                <NavLink
                  onClick={this.onClickLogoutHandler}
                  to="/"
                  className="nav-link"
                >
                  Logout
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </>
            )}

            <NavLink
              to="/cart"
              style={{ textDecoration: "none", color: "#FFFFFF" }}
              className="nav-link"
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
