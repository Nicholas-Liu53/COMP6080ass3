import React from 'react';
// import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

// import logo from './logo.svg';
import './App.css';

import { Context, initialValue } from './context';
import { Register, LogIn, logOut } from './components/Auth';
// import { /* ListingCard, ListingScreen, */NewListingButton } from './components/Listing';

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
          <nav
            id='mainNavBar'
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100vw',
              justifyContent: 'space-between'
            }}
          >
            <Link
              to='/'
              style={{ textDecoration: 'none' }}
            >
              <div height="36px" width="36px">
                <AirbnbLogo
                  src="./images/Airbnb_Logo_Belo.svg"
                  alt="Airbnb Logo"
                  height="36px"
                />
              </div>
            </Link>
            {/* <NewListingButton
              style={{ display: loggedInState ? 'block' : 'none' }}
            /> */}
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
                  style={{
                    fontWeight: 'bold',
                    display: !loggedInState ? 'block' : 'none'
                  }}
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
                <MenuItem
                  onClick={handleClose}
                  style={{
                    display: !loggedInState ? 'block' : 'none'
                  }}
                >
                  Log In
                </MenuItem>
              </Link>
              <Link
                to='/my-listings'
                style={{
                  textDecoration: 'none',
                  color: 'black'
                }}
              >
                <MenuItem
                  onClick={handleClose}
                  style={{
                    display: loggedInState ? 'block' : 'none'
                  }}
                >
                  My Listings
                </MenuItem>
              </Link>
              <Link
                to='/'
                style={{
                  textDecoration: 'none',
                  color: 'black'
                }}
              >
                <MenuItem
                  onClick={() => {
                    logOut(getters.token)
                    setters.setToken('')
                    setters.setLoggedInState(false)
                  }}
                  style={{
                    fontWeight: 'bold',
                    display: loggedInState ? 'block' : 'none'
                  }}
                >
                  Log Out
                </MenuItem>
              </Link>
            </Menu>
          </nav>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/my-listings" element={<></>} />
            <Route path="/" element={<></>}/>
          </Routes>
        </body>
      </Router>
    </Context.Provider>
  );
}

export default App;
