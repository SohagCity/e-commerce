import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="main-footer footer">
        <hr></hr>

        <div className="container">
          <h3>CONTACT ME</h3>

          <div className="row">
            <div className="col">
              <ul className="list-unstyled">
                <li>
                  <a href="https://sohagmiah.com/">My portfolio</a>
                </li>
              </ul>
            </div>
            <div className="col">
              <ul className="list-unstyled">
                <li>
                  <a href="https://github.com/SohagCity">Github</a>
                </li>
              </ul>
            </div>
            <div className="col">
              <ul className="list-unstyled">
                <li>
                  <a href="https://www.linkedin.com/in/sohag-miah-05158b107/">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr></hr>
          <div className="footer-bottm">
            <p className="text-xs-center">
              &copy;{new Date().getFullYear()} Sohag Miah | All rights reserved
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
