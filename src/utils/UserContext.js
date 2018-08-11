import React from 'react';

const UserContext = React.createContext({
  isLoggedIn: false,
});
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
