import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Button";

const SignUpButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button buttonStyle='btn--outline'  onClick={() =>
    loginWithRedirect({
      screen_hint: 'signup',
    })}>Sign Up</Button>;
};

export default SignUpButton;