import * as React from 'react';

export const AuthContext = React.createContext({
  user: null,
  isLoggedIn: false,
});
