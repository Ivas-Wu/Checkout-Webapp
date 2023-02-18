import '../../App.css';
import Graphs, { charts } from '../Graphs';
import 'react-widgets/styles.css';
import { Welcome, Body } from './pages.styled';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export interface IStatisticsPageProps {}

const Statistics: React.FC<IStatisticsPageProps> = () => {
  const graph_width = window.innerWidth * 0.45;
  const graph_height = window.innerHeight * 0.4;
  const outer_style = {
    position: 'relative',
    left: '5%',
    width: '55%',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    // boxShadow: 24,
    marginRight: '3%',
    pt: 2,
    px: 4,
    pb: 3,
  };

  const inner_style = {
    position: 'relative',
    width: graph_width,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    marginBottom: '5%',
    marginTop: '5%',
  };

  const budget_style = {
    position: 'relative',
    left: '5%',
    height: '25%',
    width: '75%',
    bgcolor: 'bacground.paper',
    marginBottom: '5%',
  };

  const budget_style2 = {
    position: 'relative',
    left: '5%',
    height: '75%',
    width: '75%',
    bgcolor: 'bacground.paper',
  };

  return (
    <>
      <Welcome>This is the Statistics Page</Welcome>
      <div
        style={{
          background: '#F1FCFF',
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
        }}
      >
        <Card sx={{ ...outer_style }}>
          <CardHeader title="Where your money goes" subheader="Subheading" />
          <CardContent>
            <Box sx={{ ...inner_style }}>
              <Graphs
                graph={charts.PI}
                width={graph_width}
                height={graph_height}
              />
            </Box>
            <Box sx={{ ...inner_style }}>
              <Graphs
                graph={charts.BAR}
                width={graph_width}
                height={graph_height}
              />
            </Box>
            <Box sx={{ ...inner_style }}>
              <Graphs
                graph={charts.LINE}
                width={graph_width}
                height={graph_height}
              />
            </Box>
          </CardContent>
        </Card>
        <div style={{ background: '#F1FCFF', position: 'relative' }}>
          <Card sx={{ ...budget_style }}>
            <CardHeader
              title="We can all budge it"
              subheader="Let's (bud)get this bread"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Somethign cool about budgeting facts idk
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ ...budget_style2 }}>
            <CardHeader
              title="Personal Budgeting"
              subheader="Let's (bud)get this bread"
            />
            <CardContent>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    required
                    id="standard-required"
                    label="Budgeting goal"
                    defaultValue=""
                    variant="standard"
                  />
                  <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                </div>
              </Box>
            </CardContent>
          </Card>
        </div>
      </div>
      <Body>Here you can view graphs with your statistics!</Body>
    </>
  );
};

export default Statistics;
