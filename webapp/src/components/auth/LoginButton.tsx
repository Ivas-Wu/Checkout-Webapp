import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../Button';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const { isAuthenticated, isLoading } = useAuth0();
  let buttonText = "Log In";
  if (isAuthenticated && !isLoading ) {
    buttonText = "View your Dashboard!"
  }

  return (
    <Button buttonStyle="btn--outline" onClick={() => loginWithRedirect()}>
      {buttonText}
    </Button>
  );
};

export default LoginButton;
