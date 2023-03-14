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
import {
  Target,
  TargetCreateReq,
  TargetUpdateReq,
  TargetTotal,
} from '../../types/Target';
import { Category, convertCategory } from '../../types/Category';

export interface IStatisticsPageProps {}

enum Months {
  January = 0,
  February = 1,
  March = 2,
  April = 3,
  May = 4,
  June = 5,
  July = 6,
  August = 7,
  September = 8,
  October = 9,
  November = 10,
  December = 11,
}

const Statistics: React.FC<IStatisticsPageProps> = () => {
  const [targetData, setData] = useState<Target[]>([]);
  const [valueData, setValue] = useState<number>(0);
  const [newValue, setNewValue] = useState<number>(0);
  const [category, setCategory] = useState<Category>(Category.OTHER);
  const [activeMonth, setActiveMonth] = useState<number>(0);
  const [activeYear, setActiveYear] = useState<number>(0);
  const [monthList, setMonthList] = useState<number[]>([]);
  const [yearList, setYearList] = useState<number[]>([]);
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
      });
    axios
      .get(`http://localhost:3000/api/targets/total?userId=${userId}`)
      .then((res) => {
        setValue(res.data.total);
      });
  };

  function convertTargets(data: Target[]): Target[] {
    let returnValue: Target[] = [];
    data.forEach(function (data) {
      const newData = {
        id: data.id,
        userId: data.userId,
        category: data.category,
        value: data.value,
      };
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

  const setDropDown = (months: boolean[], years: number[]): void => {
    let monthValues = [];
    for (let i = 0; i < months.length; i++) {
      if (months[i]) {
        monthValues.push(i);
      }
    }
    setMonthList(monthValues);
    setYearList(years);
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
          <CardHeader
            title="Where your money goes"
            subheader="Visualize your spending"
          />
          <CardContent>
            <TextField
              id="select-item"
              select
              label="Select"
              helperText="Select a Month"
              defaultValue={1}
            >
              {monthList.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                  onClick={(nextValue) => {
                    setActiveMonth(
                      nextValue.currentTarget.dataset.value
                        ? Number(nextValue.currentTarget.dataset.value)
                        : monthList[0]
                    );
                  }}
                >
                  {Months[option]}
                </MenuItem>
              ))}
            </TextField>
            {/* <TextField
              id="select-item"
              select
              label="Select"
              helperText="Select a Year"
              defaultValue={0}
            >
              {yearList.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                  onClick={(nextValue) => {
                    setActiveYear(
                      nextValue.currentTarget.dataset.value
                        ? Number(nextValue.currentTarget.dataset.value)
                        : yearList[0]
                    );
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </TextField> */}
            <Box sx={{ ...inner_style }}>
              <Graphs
                graph={charts.PI}
                width={graph_width}
                height={graph_height}
                target={valueData}
                month={activeMonth}
                activeDate={setDropDown}
              />
            </Box>
            <Box sx={{ ...inner_style }}>
              <Graphs
                graph={charts.BAR}
                width={graph_width}
                height={graph_height}
                target={valueData}
                month={activeMonth}
                activeDate={setDropDown}
              />
            </Box>
            <Box sx={{ ...inner_style }}>
              <Graphs
                graph={charts.LINE}
                width={graph_width}
                height={graph_height}
                target={valueData}
                month={activeMonth}
                activeDate={setDropDown}
              />
            </Box>
          </CardContent>
        </Card>
        <div style={{ background: '#F1FCFF', position: 'relative' }}>
          <Card sx={{ ...budget_style }}>
            <CardHeader title="Did You Know?" subheader="We can all budge it" />
            <CardContent>
              <div style={{ marginBottom: '7%' }}>
                <Typography variant="body2" color="text.secondary">
                  Canadians who budget are 8% less likely to fall behind
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  on making financial payments and are 10% less likely
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  to need to borrow money in order to pay for daily expenses*
                </Typography>
              </div>
              <div style={{ marginBottom: '7%' }}>
                <Typography variant="body2" color="text.secondary">
                  The 20% of Canadians who use digital tools for their
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  budgeting are among the most successful in managing their
                  expenses*
                </Typography>
              </div>
              <div style={{ marginBottom: '7%' }}>
                <Typography variant="body2" color="text.secondary">
                  Those who budget are less likely to spend more than
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  their monthly income than those who do not (18% vs. 29%)*
                </Typography>
              </div>
              <div>
                <Typography variant="body2" color="text.secondary">
                  If you're still curious on just how much budgeting can
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  help improve your financial wellbeing, check out{' '}
                  <a href="https://www.canada.ca/en/financial-consumer-agency/programs/research/canadian-financial-capability-survey-2019.html#toc3">
                    this study
                  </a>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  done by the government of Canada in 2019.
                </Typography>
              </div>
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
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ marginBottom: '5%', marginLeft: '-2%' }}
                  >
                    Set your personal budget and compare it to your current
                    spending!
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
                      setNewValue(
                        Number(event.target.value) >= 0
                          ? Number(event.target.value)
                          : 0
                      );
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
                      <MenuItem
                        key={option}
                        value={option}
                        onClick={(nextValue) => {
                          setCategory(
                            nextValue.currentTarget.dataset.value
                              ? convertCategory(
                                  nextValue.currentTarget.dataset.value
                                )
                              : Category.OTHER
                          );
                        }}
                      >
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
      <EndCard>
        *All stats pulled from the mentionned government of Canada study
        found&nbsp;{' '}
        <a href="https://www.canada.ca/en/financial-consumer-agency/programs/research/canadian-financial-capability-survey-2019.html#toc3">
          here
        </a>
      </EndCard>
    </>
  );
};

export default Statistics;
