import classes from './ProfileForm.module.css';
import { useContext, useRef, useState } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router';

const ProfileForm = () => {
  const PasswordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const AuthCtx = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    const newUserPassword = PasswordRef.current.value;
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FB_KEY}`,
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: AuthCtx.token,
          password: newUserPassword,
          returnSecureToken: false,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        AuthCtx.login(data.idToken);
        history.replace('/');
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {isLoading && <p>Loading...</p>}
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={PasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
