import React from 'react';

import { Context, useContext } from './../context';
import config from './../config.json';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

//* ********************************************************************** */
//*                       Feature Set 1 - Admin Auth                       */
//* ********************************************************************** */

export const SignUp = () => {
}

export const LogIn = () => {
    const { getters, setters } = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (email, password) => {
        const url = config.PREPORT_URL + config.BACKEND_PORT + "/user/auth/login";

        let body_data = {
            email: email,
            password: password
        }
        try {
            const res = await fetch(url, { 
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body_data)
            });
            const data = await res.json();
            setters.setToken(data.token);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="outlined-required"
              label="Email"
              defaultValue=""
              onInput={event => setEmail(event.target.value)}
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onInput={event => setPassword(event.target.value)}
            />
          </div>
        </Box>
      );
}