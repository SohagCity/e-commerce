import React, { Component } from "react";
import axios from "axios";
import CartColumns from "./cart/CartColumns";
import CartList from "./cart/CartList";

class Orders extends Component {
  state = { paymentLogs: [] };
  componentDidMount() {
    axios.get("/user/paymentLogs").then((res) => {
      if (res.data !== undefined) {
        this.setState(
          () => {
            return {
              paymentLogs: res.data.paymentLogs,
            };
          },
          () => {
            console.log(this.state.paymentLogs);
          }
        );
      }
    });
  }
  render() {
    return (
      <div>
        <h1 className="text-title col-10 mx-auto my-2 text-center">
          Your Orders
        </h1>
        {this.state.paymentLogs.length > 0 ? (
          this.state.paymentLogs.map((log) => {
            return (
              <div key={log._id}>
                <CartColumns order={true}></CartColumns>
                <CartList value={log.products} order={true}></CartList>

                <div className="container">
                  <span>order id : </span>
                  <strong>{log._id}</strong>
                  <div className="row">
                    <span>Address : </span>
                    <strong>{log.address}</strong>
                  </div>
                  <div className="row">
                    <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                      <h5>
                        <span> total :</span>
                        <strong>£ {log.total}</strong>
                      </h5>
                    </div>
                  </div>
                </div>
                <hr></hr>
              </div>
            );
          })
        ) : (
          <h1 className="text-title col-10 mx-auto my-2 text-center">
            You do not have orders
          </h1>
        )}
      </div>
    );
  }
}

export default Orders;
