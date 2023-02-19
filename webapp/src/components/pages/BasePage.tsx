import '../../App.css';
import Background from '../Background';
import AnimatedList from '../CardListAnimated';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

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
    ['Values', 'Up', 'To', '4', 'Lines', 'Images/values.jpg'],
  ];

  const box_body_style = {
    position: 'relative',
    width: '90%',
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    height: 450,
  };

  return (
    <>
      <div>
        <Background />
        <div>
          <div
            style={{
              background: 'linear-gradient(to bottom right, #103857, #3F7CAC)',
              height: 70,
              borderTop: '1px solid #061826',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h3" color="#FFF" align="center">
              Bing Bam Bong
            </Typography>
          </div>
          <div
            style={{
              background: 'linear-gradient(to bottom right, #a3e7ff, #F1FCFF)',
              display: 'grid',
              gridTemplateRows: 'repeat(3, auto)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 50%)',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Card sx={{ ...box_body_style }}>
                <CardHeader
                  title="Discover what we do!"
                  subtitle="Our Product"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    This
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Text
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Is
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Filler
                  </Typography>
                </CardContent>
              </Card>
              <img
                src={'Images/ourproduct.png'}
                alt={'Our Product'}
                loading="lazy"
                style={{
                  width: '90%',
                  marginTop: '5%',
                  marginLeft: '5%',
                  marginRight: '5%',
                  maxHeight: '100%',
                }}
              />
            </div>
            <div
              style={{
                background:
                  'linear-gradient(to bottom right, #a3e7ff, #F1FCFF)',
                display: 'grid',
                gridTemplateRows: 'repeat(3, auto)',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 50%)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={'Images/aboutus.jpg'}
                  alt={'About Us'}
                  loading="lazy"
                  style={{
                    width: '90%',
                    marginTop: '5%',
                    marginLeft: '5%',
                    marginRight: '5%',
                    maxHeight: '100%',
                  }}
                />
                <Card sx={{ ...box_body_style }}>
                  <CardHeader title="Who are we!" subtitle="The Team" />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      This
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Text
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Is
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Filler
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div
              style={{
                background:
                  'linear-gradient(to bottom right, #a3e7ff, #F1FCFF)',
                display: 'grid',
                gridTemplateRows: 'repeat(3, auto)',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 50%)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Card sx={{ ...box_body_style }}>
                  <CardHeader
                    title="What we stand for!"
                    subtitle="Our Values"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      This
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Text
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Is
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Filler
                    </Typography>
                  </CardContent>
                </Card>
                <img
                  src={'Images/values.jpg'}
                  alt={'Our Values'}
                  loading="lazy"
                  style={{
                    width: '90%',
                    marginTop: '5%',
                    marginLeft: '5%',
                    marginRight: '5%',
                    maxHeight: '100%',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* <AnimatedList listData={listData} /> */}
      </div>
    </>
  );
};

export default Home;
