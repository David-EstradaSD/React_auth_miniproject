import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => { // This is our Reducer function. What we dispatch as an "action" will be an object per what we define in our dispatch function below  
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return {value: '', isValid: false};
};  // this reducer function is outside the component function since we won't need any data generated inside the compnoent function 

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return {value: '', isValid: false};

};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '', 
    isValid: null});

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '', 
    isValid: null,

  });

  useEffect(() => {
    console.log('Effect running');

      return () => {
        console.log('EFFECT CLEANUP');
      };
  }, []);

  const { isValid: emailIsValid } = emailState; // using object destructuring to pull out certain properties of object
  const { isValid: passwordIsValid } = passwordState;
  // with both these lines^, we're pulling out the isValid properties and assigning an alias ( note the curly braces on the left hand side of equal sign )

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form vailidity')
      setFormIsValid(emailIsValid && passwordIsValid        
    // now that setFormIsValid is inside useEffect, this will run with the latest state values!
    // this will run with every state update that React returns 
      );
    }, 500); // our timeout duration is 5 millaseconds 

    return () => {
      console.log('CLEANUP')
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => { 
    dispatchEmail({type: 'USER_INPUT', val: event.target.value}); 
    // dispatchEmail is our "dispatch" function for our useReducer 
    // this has some identifier with all caps by convention and an extra payload (in this case, the value the user entered as "val")

  //   setFormIsValid(
  //     event.target.value.includes('@') && passwordState.isValid
  //   );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value})

    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
