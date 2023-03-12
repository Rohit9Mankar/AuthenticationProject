import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formValid,setFormValid]=useState(false);
  const newUserName=useRef();
  const newUserPassword=useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);

  };

  const submitHandler=()=>{
    
    if(newUserName.current.value && newUserPassword.current.value.length<7)
    {
      setFormValid(false);
     alert("Invalid username and password");
    }
    else{
      setFormValid(true);
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
        <div>
          <button type='submit' >{formValid ? "SendingRequest": "Signup"}</button>
        </div>
        <div className={classes.actions}>
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
