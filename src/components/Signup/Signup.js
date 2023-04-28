import React, {useEffect, useState} from 'react';
import classes from './Signup.module.css';
import mealsImage from './meals.jpg';
import Card from '../UI/Card';
import c1 from '../Meals/AvailableMeals.module.css';
import cl from '../Layout/Header.module.css';
import useInput from '../../hooks/useInput';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css';
import { Link } from 'react-router-dom';

export default function Signup() {
    
    const [formisValid, setFormisValid] = useState(true);
    const [statusCode, setStatusCode] = useState(0);
    const [inputClear, setInputClear] = useState(true);

    const {
        value: enteredemail,
        isValid: emailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangedHandler,
        inputBlurHandler: emailBlurHandler
    } = useInput((value) => value.trim() !== '' && value.includes('@'));

    const {
        value: enteredpass,
        isValid: passIsValid,
        hasError: passInputHasError,
        valueChangeHandler: passChangedHandler,
        inputBlurHandler: passBlurHandler
    } = useInput((value) => value.trim() !== '' && value.length > 6);

    const userRegistration = async () => {
        await fetch('https://react-6784b-default-rtdb.firebaseio.com/users.json', {
            method: 'POST',
            body: JSON.stringify({
                email: enteredemail,
                Password: enteredpass
            }),
        })
        .then((response) => setStatusCode(response.status))
    };

    useEffect(()=>
    {
        if(statusCode === 200)
        {
            toastr.options = {
                "closeButton": true,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-bottom-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
            toastr.clear();
            setTimeout(() => toastr.success(`Registration Done Successfully`), 300);
        }
    },[statusCode]);

    const confirmHandler = (event) => {
        event.preventDefault();
        if(!formisValid)
        {
            userRegistration();
            setInputClear(false);
            setFormisValid(true);
        }
    };

    const emailControlClasses = `${classes.control} ${emailInputHasError ? classes.invalid : ''
        }`;
    const passControlClasses = `${classes.control} ${passInputHasError ? classes.invalid : ''
        }`;

    const formIsValid =
        emailIsValid &&
        passIsValid;

    useEffect(()=>
    {
        formIsValid && setFormisValid(false);
    },[formIsValid]);

  return (
    <div>
          <header className={cl.header}>
              <h2>ReactMeals</h2>
          </header>
          <div className={cl['main-image']}>
              <img src={mealsImage} alt='A table full of delicious food!' />
          </div>

          <section className={c1.meals} style={{ maxWidth: '30rem', margin: '-15rem auto' }}>
              <Card style={{ zIndex: 100 }}>
                  <div>
                      <h2 style={{ textAlign: "center" }}>SignUp</h2>
                  </div>
                  <form className={classes.form} onSubmit={confirmHandler}>
                      <div className={emailControlClasses}>
                          <label htmlFor='name'>Email</label>
                          <input type='email' id='name' value={inputClear ? enteredemail: ''} onChange={emailChangedHandler}
                              onBlur={emailBlurHandler} style={{ width: "100%", height: "40px" }} />
                      </div>
                      <br></br>
                      <div className={passControlClasses}>
                          <label htmlFor='street'>Password</label>
                          <input type='password' id='street' value={inputClear ? enteredpass : ''} onChange={passChangedHandler}
                              onBlur={passBlurHandler} style={{ width: "100%", height: "40px" }} />
                      </div>
                      <br></br>
                      <div className={classes.actions}>
                          <button className={classes.submit} disabled={formisValid}>Submit</button>
                      </div>
                  </form>
                  <div style={{ textAlign: "center" }}>
                      <p>Already have an Account? <Link to="/" style={{ textDecoration: "none" }}>Login</Link></p>
                  </div>
              </Card>
          </section>
    </div>
  )
}