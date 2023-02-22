import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

function HeaderCartButton(props) {
  const [buttonHighlighted, setButtonHighlighted] = useState(false);
  const ctx = useContext(CartContext);
  const numberOfCartItems = ctx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  // Use object destructuring to pull out items from ctx, so that useEffect only triggers when items updates
  // (rather than anything else in ctx)
  const {items} = ctx;

  const buttonClasses = `${classes.button} ${
    buttonHighlighted ? classes.bump : ''
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setButtonHighlighted(true);
    const timer = setTimeout(() => {
      setButtonHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderCartButton;
