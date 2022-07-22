import { useAuth0 } from '@auth0/auth0-react';
import '../../App.css';
import IndexPage from '../HomeWidget/index';
import { Welcome } from './pages.styled';
import React, { useEffect } from 'react';
import axios from 'axios';

export interface IHomePageProps {}

const Home: React.FC<IHomePageProps> = () => {
  const { user } = useAuth0();

  useEffect(() => {
    const userId = localStorage.getItem('user-id');

    if (!userId) {
      const fetchUserDb = async () => {
        axios
          .get(`http://localhost:3000/api/users?email=${user?.email}`)
          .then((res) => {
            console.log(res);
            localStorage.setItem('user-id', res.data[0].id.toString());
          });
      };

      fetchUserDb().catch(console.error);
    }
  }, [user?.email]);

  const pages = [
    ['videos/goals.gif', 'Goals page', '/goals'],
    ['videos/information.gif', 'Information page', '/information'],
    ['videos/stats2.gif', 'Statistics page', '/stats'],
  ];
  return (
    <>
      <Welcome>Welcome back, {user?.name} </Welcome>
      <IndexPage pages={pages} />
      <div>&nbsp;</div>
    </>
  );
};

export default Home;
