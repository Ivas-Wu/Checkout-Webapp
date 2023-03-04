import '../../App.css';
import React, { useState, useEffect } from 'react';
import Graphs, { charts } from '../Graphs';
import 'react-widgets/styles.css';
import { Welcome, EndCard } from './pages.styled';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '../Button';
import axios from 'axios';
import { Target, TargetCreateReq, TargetUpdateReq } from '../../types/Target';
import { Category, convertCategory } from '../../types/Category';
import { dataValue } from 'react-widgets/esm/Accessors';

export interface IStatisticsPageProps {}

const Statistics: React.FC<IStatisticsPageProps> = () => {
  const [targetData, setData] = useState<Target[]>([]);
  const [valueData, setValue] = useState<number>(0);
  const [newValue, setNewValue] = useState<number>(0);
  const [category, setCategory] = useState<Category>(Category.OTHER);
  const [id, setId] = useState<number>(1);
  const userId = Number(localStorage.getItem('user-id')!);
  const graph_width = window.innerWidth * 0.45;
  const graph_height = window.innerHeight * 0.4;
  const outer_style = {
    position: 'relative',
    left: '5%',
    width: '55%',
    bgcolor: 'background.paper',
    marginRight: '3%',
    pt: 2,
    px: 4,
    pb: 3,
  };

  const inner_style = {
    position: 'relative',
    width: graph_width,
    bgcolor: 'background.paper',
    marginBottom: '5%',
    marginTop: '5%',
  };

  const budget_style = {
    position: 'relative',
    left: '5%',
    height: '33%',
    width: '75%',
    bgcolor: 'bacground.paper',
    marginBottom: '5%',
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`http://localhost:3000/api/targets?userId=${userId}`)
      .then((res) => {
        let data: Target[] = convertTargets(res.data);
        setData(data);
        console.log(valueData);
        console.log(id);
      });
  };

  function convertTargets(data: Target[]): Target[] {
    let returnValue: Target[] = [];
    let once = true;
    data.forEach(function (data) {
      const newData = {
        id: data.id,
        userId: data.userId,
        category: data.category,
        value: data.value,
      };
      if (once) {
        setValue(data.value);
        setId(data.id);
        once = false;
      }
      returnValue.push(newData);
    });
    return returnValue;
  }

  const submitBudget = (): void => {
    let data: TargetCreateReq = {
      userId: userId,
      category: category,
      value: newValue,
    };
    axios.post(`http://localhost:3000/api/targets/`, data).then((res) => {
      getData();
    });
    setNewValue(0);
    setCategory(Category.OTHER);
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
                target={valueData}
              />
            </Box>
            <Box sx={{ ...inner_style }}>
              <Graphs
                graph={charts.BAR}
                width={graph_width}
                height={graph_height}
                target={valueData}
              />
            </Box>
            <Box sx={{ ...inner_style }}>
              <Graphs
                graph={charts.LINE}
                width={graph_width}
                height={graph_height}
                target={valueData}
              />
            </Box>
          </CardContent>
        </Card>
        <div style={{ background: '#F1FCFF', position: 'relative' }}>
          <Card sx={{ ...budget_style }}>
            <CardHeader
              title="We can all budge it"
              subheader="Let's (bud)get this bread 🍞"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Somethign cool about budgeting facts idk
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ ...budget_style }}>
            <CardHeader
              title="Personal Budgeting"
              subheader="Let's (bud)get this bread 🍞"
            />
            <CardContent>
              <Box>
                <div style={{ margin: '-3% 0 5% 2%' }}>
                  {/* <TextField
                    required
                    id="standard-required"
                    label="Budgeting goal"
                    defaultValue=""
                    variant="standard"
                  /> */}
                  <Typography variant="body2" color="text.secondary" style={{marginBottom:'5%', marginLeft:'-2%'}}>
                    Set your personal budget and compare it to your current spending!
                  </Typography>
                  <TextField
                    id="standard-number"
                    label="Budget Goal!"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    value={newValue}
                    onChange={(event) => {
                      setNewValue(Number(event.target.value) >= 0 ? Number(event.target.value) : 0);
                    }}
                  />
                </div>
                <div style={{ marginBottom: '10%' }}>
                <TextField
                    id="select-category"
                    select
                    label="Select"
                    defaultValue={category}
                    helperText="Please choose a category"
                  >
                    {Object.values(Category).map((option) => (
                      <MenuItem key={option} value={option} 
                      onClick={(nextValue) => {
                        setCategory(nextValue.currentTarget.dataset.value ? convertCategory(nextValue.currentTarget.dataset.value) : Category.OTHER);
                      }}>
                        {option}
                      </MenuItem>
                    ))}
                </TextField>
                </div>
                <Button
                  buttonStyle="btn--extra"
                  buttonSize="btn--medium"
                  onClick={submitBudget}
                >
                  Set Budget!
                </Button>
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ ...budget_style }}>
            <CardHeader
              title="Personal Ads ;)"
              subheader="100% of clients would recommend"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Enjoy the content? You can put your own ads here! Contact us to
                find out more!
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
      <EndCard>Here you can view graphs with your statistics!</EndCard>
    </>
  );
};

export default Statistics;
