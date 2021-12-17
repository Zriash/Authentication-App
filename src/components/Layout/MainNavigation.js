import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const AuthCtx = useContext(AuthContext);
  const history = useHistory();
  const logoutHandler = () => {
    AuthCtx.logout();
    history.replace('/');
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
        {!AuthCtx.isLoggedIn && <li> <Link to='/auth'>Login</Link></li>}
        {AuthCtx.isLoggedIn && <li><Link to='/profile'>Profile</Link></li>}
        {AuthCtx.isLoggedIn && <li><button onClick={logoutHandler}>Logout</button></li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
