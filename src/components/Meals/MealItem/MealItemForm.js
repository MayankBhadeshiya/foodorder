import classes from "./MealItemForm.module.css";
import React, { useState } from "react";

const MealItemForm = (props) => {
  const [added, setadded] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = 1;
    props.onAddToCart(enteredAmount);
    setadded(true);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {added ? (
        <p className="text-orange-800 text-sm">✔ Added to cart</p>
      ) : (
        <button>+ Add</button>
      )}
    </form>
  );
};

export default MealItemForm;
