import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const newUserName = useRef();
  const newUserPassword = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);

  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = newUserName.current.value;
    const enteredPassword = newUserPassword.current.value;
    setIsLoading(true);

    if (isLogin) {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDfaJjy3LS1PJdi1F6WXFp9vNutlkkdJwA',
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(async (res) => {
          setIsLoading(false)
          if (res.ok) {
            const data = await res.json();
            console.log(data);
          }
          else {
            const data_1 = await res.json();
            let errorMessag = "Authentication failed";
            if (data_1 && data_1.error && data_1.error.message) {
              errorMessag = data_1.error.message;
            }
            alert(errorMessag);

          }
        })
    }
    else {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDfaJjy3LS1PJdi1F6WXFp9vNutlkkdJwA',
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then((res) => {
        setIsLoading(false);
        if (res.ok) {
          console.log(res.status);
        }
        else {
          return res.json()
            .then((data) => {
              let errorMessage = "Authentication failed";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              alert(errorMessage);
            });
        }
      });
    }


  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={newUserName} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={newUserPassword}
            required
          />
        </div>



        <div className={classes.actions}>
          {!isLoading && <button type='submit' >{isLogin ? "Login" : "Create account"}</button>}
          {isLoading && <p>Sending request..</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}

          </button>


        </div>
      </form>
    </section>
  );
};

export default AuthForm;
