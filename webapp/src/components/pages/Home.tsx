import '../../App.css';
import IndexPage from '../HomeWidget/index';
import { Welcome, Body } from './pages.styled';

export interface IHomePageProps {}

const Home: React.FC<IHomePageProps> = () => {
  const pages = [
    ['videos/goals.gif', 'Goals page', '/goals'],
    ['videos/information.gif', 'Information page', '/information'],
    ['videos/stats2.gif', 'Statistics page', '/stats'],
  ];
  return (
    <>
      <Welcome>Welcome back, Username!</Welcome>
      <Body>Something here?</Body>
      <IndexPage pages={pages} />
      <div>&nbsp;</div>
    </>
  );
};

export default Home;
