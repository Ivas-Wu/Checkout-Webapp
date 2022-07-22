import '../../App.css';
import Background from '../Background';
import AnimatedList from '../CardListAnimated';

const Home: React.FC = () => {
  const listData = [
    [
      'About Us',
      'Something about Cole',
      'Something about Daniel',
      'Something about Alex',
      'Something about Ivas',
      'Images/aboutus.jpg',
    ],
    [
      'Our Product',
      'Checkout',
      'What it does',
      'Who its for',
      'Why it does',
      'Images/ourproduct.png',
    ],
    [
      'Values',
      'Up',
      'To',
      '4',
      'Lines',
      'Images/values.jpg',
    ],
  ];

  return (
    <>
      <div>
        <Background />
        <AnimatedList listData={listData} />
      </div>
    </>
  );
};

export default Home;
