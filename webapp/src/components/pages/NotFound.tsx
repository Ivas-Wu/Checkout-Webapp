import '../../App.css';
import { Welcome, EndCard } from './pages.styled';

const NotFound: React.FC = () => {
  return (
    <>
      <Welcome>Page Not Found</Welcome>
      <EndCard>Something went wrong, please return to the home page </EndCard>
    </>
  );
};

export default NotFound;
