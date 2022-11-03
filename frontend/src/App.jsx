import React from 'react';
// import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

// import logo from './logo.svg';
import './App.css';

import { Context, initialValue } from './context';
import { Register, LogIn } from './components/Auth';
// import { Navbar } from './components/Navbar';

import { ReactComponent as AirbnbLogo } from './images/Airbnb_Logo_Belo.svg';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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

  // const { getters } = useContext(Context);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Context.Provider value={{ getters, setters, }}>
      <Router>
        <body>
          <nav style={{ display: 'flex', flexDirection: 'row' }}>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <div height="36px" width="36px">
                <AirbnbLogo
                  src="./images/Airbnb_Logo_Belo.svg"
                  alt="Airbnb Logo"
                  height="36px"
                />
              </div>
            </Link>
            <Button
              id="basic-button"
              variant="outlined"
              style={{
                border: '1px solid grey',
                borderRadius: '100px'
              }}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MenuIcon color='action'/>
              <AccountCircleIcon color='action'/>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <Link
                to='/register'
                style={{
                  textDecoration: 'none',
                  color: 'black'
                }}
              >
                <MenuItem
                  onClick={handleClose}
                  style={{ fontWeight: 'bold' }}
                >
                  Sign Up
                </MenuItem>
              </Link>
              <Link
                to='/login'
                style={{
                  textDecoration: 'none',
                  color: 'black'
                }}
              >
                <MenuItem onClick={handleClose}>Log In</MenuItem>
              </Link>
            </Menu>
          </nav>
          <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/">
          </Route>
        </Switch>
        </body>
      </Router>
    </Context.Provider>
  );
}

export default App;
