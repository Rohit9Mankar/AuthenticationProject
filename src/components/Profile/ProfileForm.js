import { useHistory } from 'react-router-dom';
import { useRef ,useContext} from 'react';
import AuthContext from '../../store/AuthContext';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
const newPasswordRef=useRef();
const history=useHistory();
const authCtx=useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    const newEnteredPassword=newPasswordRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDfaJjy3LS1PJdi1F6WXFp9vNutlkkdJwA', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.tokens,
        password: newEnteredPassword,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res)=>{
      console.log(res.status);
      history.replace('/auth');
    })
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef}/>
      </div>
      <div className={classes.action}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
