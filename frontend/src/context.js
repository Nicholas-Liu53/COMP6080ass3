import React from 'react';
import { createContext } from 'react';

export const initialValue = {
  token: '',
  loggedIn: false
};

export const Context = createContext(initialValue);
export const useContext = React.useContext;