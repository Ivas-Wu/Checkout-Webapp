import '../../App.css';
import { Welcome, Body } from './pages.styled';

const NotFound: React.FC = () => {
  return (
    <>
      <Welcome>Page Not Found</Welcome>
      <Body>Something went wrong, please return to the home page </Body>
    </>
  );
};

export default NotFound;
