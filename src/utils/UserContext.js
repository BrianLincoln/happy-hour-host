import React from 'react';

const UserContext = React.createContext({
  user: {
    isLoggedIn: false,
  },
});
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
