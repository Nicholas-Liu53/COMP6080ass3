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
import { AllListingsScreen, EditListingScreen, ListingScreen, MyListingScreen, NewListingButton } from './components/Listing';

import { ReactComponent as AirbnbLogo } from './images/Airbnb_Logo_Belo.svg';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const App = () => {
  const [token, setToken] = React.useState(initialValue.token);
  const [loggedInState, setLoggedInState] = React.useState(initialValue.loggedIn);
  const [loggedInEmail, setLoggedInEmail] = React.useState(initialValue.loggedInEmail);
  const [listingToBeViewed, setListingToBeViewed] = React.useState(initialValue.listingToBeViewed);
  const [reRenderPls, setReRenderPls] = React.useState(initialValue.reRenderPls);
  const [searchTermInProgress, setSearchTermInProgress] = React.useState(initialValue.searchTerm);
  const [searchTerm, setSearchTerm] = React.useState(initialValue.searchTerm);

  const getters = {
    token,
    loggedInState,
    loggedInEmail,
    listingToBeViewed,
    reRenderPls,
    searchTerm
  };
  const setters = {
    setToken,
    setLoggedInState,
    setLoggedInEmail,
    setListingToBeViewed,
    setReRenderPls,
    setSearchTerm
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
        <>
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
            <Stack
              sx={{ display: 'flex', flexDirection: 'row' }}
            >
              <TextField
                id="searchBar"
                label="Search Bar"
                variant="standard"
                onChange={event => setSearchTermInProgress(event.target.value)}
              />
              <IconButton
                id="searchButton"
                color="primary"
                variant="contained"
                onClick={() => {
                  setters.setSearchTerm(searchTermInProgress)
                }}
              >
                <SearchIcon color="disabled" />
              </IconButton>
            </Stack>
            <NewListingButton
              loggedInState={loggedInState}
            />
            <Button
              id="user-menu-button"
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
                  id="signup-nav-button"
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
                  id="login-nav-button"
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
                  id="my-listing-nav-button"
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
                  id="logout-button"
                  onClick={() => {
                    logOut(getters.token)
                    setters.setToken('')
                    setters.setLoggedInState(false)
                    setters.setLoggedInEmail('');
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
            <Route path={'/listing/:listingId'} element={<ListingScreen listingId={getters.listingToBeViewed}/>} />
            <Route path={'/listing/edit/:listingId'} element={<EditListingScreen listingId={getters.listingToBeViewed}/>} />
            <Route path="/my-listings" element={<MyListingScreen />} />
            <Route path="/" element={<AllListingsScreen />}/>
          </Routes>
        </>
      </Router>
    </Context.Provider>
  );
}

export default App;
