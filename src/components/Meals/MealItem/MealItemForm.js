import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

function MealItemForm(props) {
    const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredAmountString = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmountString;

    if (enteredAmountString.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 10){
        setAmountIsValid(false);
        return;
    }

    props.onAddToCart(enteredAmountNumber);

  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "10",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-10).</p>}
    </form>
  );
}

export default MealItemForm;
