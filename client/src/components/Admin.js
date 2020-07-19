import React, { Component } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

class Admin extends Component {
  state = { users: [] };
  componentDidMount() {
    axios.get("/user/admin").then((res) => {
      if (res.data.length > 0) {
        this.setState(
          () => {
            return {
              users: res.data,
            };
          },
          () => {}
        );
      }
    });
  }
  onChange = (user, event) => {
    const index = this.state.users.indexOf(user);
    const users = this.state.users;

    users[index].role = event.target.value;
    this.setState({ users });
  };
  onSubmit = (user, event) => {
    event.preventDefault();

    axios
      .post(`/user/update/` + user._id, user)
      .then((res) => console.log(res.data));

    window.location.reload();
  };

  onDelete = (user, event) => {
    event.preventDefault();

    axios
      .delete(`/user/delete/` + user._id, user)
      .then((res) => console.log(res.data));

    window.location.reload();
  };

  render() {
    return (
      <div>
        <h1 className="text-title col-10 mx-auto my-2 text-center">
          change user access
        </h1>

        <div className="container-fluid text-center d-none d-lg-block">
          <div className="row">
            <div className="col-10 mx-auto col-lg-2">
              <strong className="text-uppercase">name</strong>
            </div>

            <div className="col-10 mx-auto col-lg-2">
              <strong className="text-uppercase">email</strong>
            </div>

            <div className="col-10 mx-auto col-lg-2">
              <strong className="text-uppercase">role</strong>
            </div>
            <div className="col-10 mx-auto col-lg-2"></div>
          </div>
        </div>

        {this.state.users.map((user) => {
          return (
            <div className="row my-3 text-center" key={user._id}>
              <div className="col-10 mx-auto col-lg-2">{`${user.firstName} ${user.lastName}`}</div>
              <div className="col-10 mx-auto col-lg-2">{user.username}</div>
              <div className="col-10 mx-auto col-lg-2">
                <Form id="changeRole" onSubmit={(e) => this.onSubmit(user, e)}>
                  <Form.Control
                    as="select"
                    className="my-1 mr-sm-2"
                    id="inlineFormCustomSelectPref"
                    custom
                    value={user.role}
                    onChange={(e) => this.onChange(user, e)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </Form.Control>
                </Form>
              </div>
              <div className="col-10 mx-auto col-lg-2">
                <Button type="submit" form="changeRole">
                  Confirm
                </Button>{" "}
                <Button
                  onClick={(e) => this.onDelete(user, e)}
                  variant="danger"
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Admin;
