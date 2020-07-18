import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ProductProvider } from "./context";
import { AuthProvider } from "./AuthContext";

ReactDOM.render(
  <AuthProvider>
    <ProductProvider>
      <Router>
        <App />
      </Router>
    </ProductProvider>
  </AuthProvider>,
  document.getElementById("root")
);
