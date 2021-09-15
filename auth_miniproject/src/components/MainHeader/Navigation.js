import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';

import classes from './Navigation.module.css';

const Navigation = () => {

  const context = useContext(AuthContext); // we use useContext hook to avoid functions in our JSX code

  return (
    <nav className={classes.nav}>
      <ul>
        {context.isLoggedIn && ( // this used to be isLoggedIn.isLoggedIn BUT we replaced the isLoggedIn props with the Context provider defined in auth-context and forwarded to App.js 
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {context.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {context.isLoggedIn && (
          <li>
            <button onClick={context.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
