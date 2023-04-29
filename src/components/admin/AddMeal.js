import React from 'react';
import useInput from '../../hooks/useInput';
import classes from './AddMeal.module.css';

function AddMeal() {
  async function addMealHandler(meal) {
    const response = await fetch('https://foodorder-e232d-default-rtdb.firebaseio.com/meals.json', {
      method: 'POST',
      body: JSON.stringify(meal),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangedHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredPrice,
    isValid: enteredPriceIsValid,
    hasError: priceInputHasError,
    valueChangeHandler: priceChangedHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPrice
  } = useInput((value) => value.trim() !== '');

  const formIsValid =
    enteredNameIsValid &&
    enteredDescriptionIsValid &&
    enteredPriceIsValid;

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const meal = {
      name: enteredName,
      description: enteredDescription,
      price: Number(enteredPrice),
    };

    addMealHandler(meal);

    resetName();
    resetDescription();
    resetPrice();
  };

  const nameControlClasses = `${classes.control} ${nameInputHasError ? classes.invalid : ''
    }`;
  const descriptionControlClasses = `${classes.control} ${descriptionInputHasError ? classes.invalid : ''
    }`;
  const priceControlClasses = `${classes.control} ${priceInputHasError ? classes.invalid : ''
    }`;


  return (
    <div style={{ margin: 'auto', maxWidth: '450px' }}>
      <div className='shadow p-4 rounded-xl bg-white'>
        <h2>Add Meal</h2>
        <form className={classes.form} onSubmit={confirmHandler}>
          <div className={nameControlClasses}>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' value={enteredName} onChange={nameChangedHandler}
              onBlur={nameBlurHandler} />
          </div>
          <div className={descriptionControlClasses}>
            <label htmlFor='description'>Description</label>
            <textarea rows='3' id='description' value={enteredDescription} onChange={descriptionChangedHandler}
              onBlur={descriptionBlurHandler}></textarea>
          </div>
          <div className={priceControlClasses}>
            <label htmlFor='price'>Price</label>
            <input type='text' id='price' value={enteredPrice} onChange={priceChangedHandler}
              onBlur={priceBlurHandler} />
          </div>
          <div className={classes.actions}>
            {formIsValid && <button className={classes.submit}>Confirm</button>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMeal;
