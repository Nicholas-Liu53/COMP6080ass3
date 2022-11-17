import React, { createContext } from 'react';

export const initialValue = {
  token: '',
  loggedIn: false,
  loggedInEmail: '',
  listingToBeViewed: -1,
  reRenderPls: true,
  searchTermInProgress: '',
  searchTerm: ''
};

export const Context = createContext(initialValue);
export const useContext = React.useContext;