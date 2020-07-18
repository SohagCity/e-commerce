import { useEffect } from "react";

const CartLocalStorage = (props) => {
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(props.cart));
  }, [props.cart]);

  return null;
};

export default CartLocalStorage;
