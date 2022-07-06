import { useState } from 'react';

export default function useAuthToken() {
  const getAuthToken = () => {
    const authTokenString = localStorage.getItem('authToken');
    let userAuthToken; 
    if (authTokenString) {
      userAuthToken = JSON.parse(authTokenString);
    }
    return userAuthToken?.token
  };

  const [authToken, setAuthToken] = useState(getAuthToken());

  const saveAuthToken = (userAuthToken: string) => {
    localStorage.setItem('authToken', JSON.stringify(userAuthToken));
    setAuthToken(userAuthToken);
  };

  const removeAuthToken = () => {
    localStorage.removeItem('authToken');
    setAuthToken(undefined)
  }

  return {
    setAuthToken: saveAuthToken,
    authToken,
    removeAuthToken
  }
}