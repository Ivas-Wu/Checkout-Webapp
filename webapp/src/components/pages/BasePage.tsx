import '../../App.css';
import Background from '../Background';
import AnimatedList from '../CardListAnimated';

const Home: React.FC = () => {
  const listData = [
    [
      'About Us',
      'Up',
      'To',
      '4',
      'Lines',
      'Images/zuko.jpg',
      'Images/aboutus.jpg',
    ],
    [
      'Our Product',
      'Up',
      'To',
      '4',
      'Lines',
      'Images/question.jpg',
      'Images/ourproduct.png',
    ],
    [
      'Values',
      'Up',
      'To',
      '4',
      'Lines',
      'Images/flex.jpg',
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
