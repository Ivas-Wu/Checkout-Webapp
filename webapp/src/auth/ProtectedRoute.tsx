import { withAuthenticationRequired } from '@auth0/auth0-react';
import React from 'react';
import Loading from '../components/Loading';

type RouteProps = {
  component: any;
};

export const ProtectedRoute = ({ component }: RouteProps) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <Loading />,
  });

  return <Component />;
};
