import React from 'react';

import { Context, useContext } from './../context';
import config from './../config.json';

import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

//* ********************************************************************** */
//*                       Feature Set 1 - Admin Auth                       */
//* ********************************************************************** */

// Component to Register
export const Register = () => {
  const { getters, setters } = useContext(Context);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConf, setPasswordConf] = React.useState('');

  const navigate = useNavigate();

  const signup = async (name, email, password, passwordConf) => {
    const url = config.PREPORT_URL + config.BACKEND_PORT + '/user/auth/register';

    if (password !== passwordConf) {
      alert('Passwords don\'t match!!');
      throw new Error('Passwords don\'t match!!');
    }

    const bodyData = {
      email: email,
      password: password,
      name: name
    }
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      });
      const data = await res.json();
      console.log(data);
      if (data.token) {
        setters.setToken(data.token);
        setters.setLoggedInState(true);
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Context.Provider value={{ getters, setters, }}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault()
          signup(name, email, password, passwordConf)
        }}
      >
        <div>
          <TextField
            id='register-name-input'
            label='Name'
            value={name}
            onInput={event => setName(event.target.value)}
          />
          <TextField
            id='register-email-input'
            label='Email'
            value={email}
            onInput={event => setEmail(event.target.value)}
          />
          <TextField
            id='register-password-input'
            label='Password'
            type='password'
            autoComplete='current-password'
            value={password}
            onInput={event => setPassword(event.target.value)}
          />
          <TextField
            id='register-password-conf-input'
            label='Password Confirmation'
            type='password'
            autoComplete='current-password'
            value={passwordConf}
            onInput={event => setPasswordConf(event.target.value)}
          />
          <Button
            id='register-button'
            variant="contained"
            type="submit"
          >
            Register
          </Button>
        </div>
      </Box>
    </Context.Provider>
  );
}

// Component to Log In
export const LogIn = () => {
  const { getters, setters } = useContext(Context);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const navigate = useNavigate();

  const login = async (email, password) => {
    const url = config.PREPORT_URL + config.BACKEND_PORT + '/user/auth/login';

    const bodyData = {
      email: email,
      password: password
    }
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      });
      const data = await res.json();
      console.log(data);
      if (data.token) {
        setters.setToken(data.token);
        setters.setLoggedInState(true);
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Context.Provider value={{ getters, setters, }}>
      <>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={(event) => {
            event.preventDefault()
            login(email, password)
          }}
        >
          <div>
            <TextField
              id='login-email-input'
              label='Email'
              value={email}
              onInput={event => setEmail(event.target.value)}
            />
            <TextField
              id='login-password-input'
              label='Password'
              type='password'
              autoComplete='current-password'
              value={password}
              onInput={event => setPassword(event.target.value)}
            />
            <Button
              id='log-in-button'
              variant="outlined"
              type="submit"
            >
              Log In
            </Button>
          </div>
        </Box>
      </>
    </Context.Provider>
  );
}

// Function to log out
// NOTE: This is a FUNCTION not a component
export const logOut = async (token) => {
  const url = config.PREPORT_URL + config.BACKEND_PORT + '/user/auth/logout';

  // const { getters, setters } = useContext(Context);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    console.log(data);
    // setters.setToken('');
    // setters.setLoggedInState(false);
  } catch (err) {
    console.log(err);
  }
}
