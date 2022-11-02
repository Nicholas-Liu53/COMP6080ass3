import React from 'react';
// import ReactDOM from 'react-dom';

// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

// import logo from './logo.svg';
import './App.css';

import { Context, initialValue } from './context';
// import { signUp, logIn } from './components/Auth';
// import { Navbar } from './components/Navbar';

const App = () => {
  const [token, setToken] = React.useState(initialValue.token);
  const [loggedInState, setLoggedInState] = React.useState(initialValue.loggedIn);

  const getters = {
    token,
    loggedInState,
  };
  const setters = {
    setToken,
    setLoggedInState,
  };

  //* ********************************************************************** */
  //*                       Feature Set 1 - Admin Auth                       */
  //* ********************************************************************** */

  return (
    <Context.Provider value={{ getters, setters, }}>
      <body>
      </body>
    </Context.Provider>
  );
}

export default App;
