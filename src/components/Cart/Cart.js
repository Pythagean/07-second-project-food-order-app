import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import axios from "axios";

function Cart(props) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setDidSubmit] = useState(false);
  const ctx = useContext(CartContext);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  function cartItemRemoveHandler(id) {
    ctx.removeItem(id);
  }

  function cartItemAddHandler(item) {
    ctx.addItem({ ...item, amount: 1 });
  }

  function orderClickHandler() {
    setIsCheckingOut(true);
  }

  function submitOrderHandler(userData) {
    setIsSubmitting(true);

    axios
      .post(
        "https://food-order-app-c4b5f-default-rtdb.firebaseio.com//orders.json",
        {
          body: JSON.stringify({ user: userData, orderedItems: ctx.items }),
        }
      )
      .then(function (response) {})
      .catch(function (error) {})
      .finally(function () {
        setIsSubmitting(false);
        setDidSubmit(true);
        ctx.clearCart();
      });
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button onClick={orderClickHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {isCheckingOut && (
        <Checkout onCancel={props.onClose} onSubmit={submitOrderHandler} />
      )}
      {!isCheckingOut && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>

  const submitSuccessModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>

      <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
    </React.Fragment>
  );

  return <Modal onClose={props.onClose}>
    {!isSubmitting && !submitSuccess && cartModalContent}
    {isSubmitting && isSubmittingModalContent}
    {!isSubmitting && submitSuccess && submitSuccessModalContent}
    </Modal>;
}

export default Cart;
