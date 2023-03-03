import '../../App.css';
import Background from '../Background';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

const Home: React.FC = () => {

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
             Still Need Convincing?
            </Typography>
          </div>
          <div
            style={{
              background: 'linear-gradient(to bottom right, #a3e7ff, #F1FCFF)',
              // background: '#a3e7ff',
              display: 'grid',
              gridTemplateRows: 'repeat(3, auto)',
              backgroundRepeat: 'no-repeat',
              padding: "0 0 60px 0"
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
                  title="Discover What We Do!"
                  subtitle="Our Product"
                />
                <CardContent>
                  <Typography variant="body1" color="text.secondary" style={{padding: '0 0 30px 0'}}>
                    Checkout is a platform that aims to turn budgeting and managing your daily finances from daunting, complicated,
                    and time-consuming task into a simple, quick, and intuitive process. The mobile app allows you to quickly
                    take pictures of your receipts, which are automatically scanned, processed and stored in the system.
                    You can then use the mobile or web app to view analysis of your spending habits, receive personalized suggestions,
                    and manually input spending data for things you may not have receipts for.
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    We also have tools to help make your day to day financial lives easier. We have reminders that alert you when it's
                    time to pay the bills, targets to help you granuarly track your spending within various categories, and many more! 
                    All it takes to see how we can help you organize your finances is one FREE acount. 
                  </Typography>
                </CardContent>
              </Card>
              <img
                src={'Images/product.png'}
                alt={'Our Product'}
                loading="lazy"
                style={{
                  width: '50%',
                  margin: '5%',
                  maxHeight: '70%',
                  paddingLeft: '20%', //This is just a hack until we get images of the right size
                }}
              />
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 50%)',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={'Images/ourteam.png'}
                alt={'Our Team'}
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
                <CardHeader title="Meet Our Team!" subtitle="The Team" />
                <CardContent>
                  <div 
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 50%)',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{padding: '30px 0 50px 0'}}>
                      <Typography variant="h5" color="text.primary">
                        Alex Shim
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Area of Focus: Image processing / scanning
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Interests: 
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                      Song on Repeat:
                      </Typography>
                    </div>
                    <div style={{padding: '30px 0 50px 0'}}>
                      <Typography variant="h5" color="text.primary">
                        Daniel Li
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Area of Focus: Mobile application
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Interests: 
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                      Song on Repeat:
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="h5" color="text.primary">
                        Cole Cherney
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Area of Focus: Backend and infastructure
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Interests: 
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                      Song on Repeat:
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="h5" color="text.primary">
                        Ivas Wu
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Area of Focus: Web application
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Interests: 
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                      Song on Repeat:
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* <AnimatedList listData={listData} /> */}
      </div>
    </>
  );
};

export default Home;
