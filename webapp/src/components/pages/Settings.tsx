import '../../App.css';
import React, { useEffect, useState } from 'react';
import { EndCard, Welcome } from './pages.styled';
import '../../App.css';
import 'react-widgets/styles.css';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from '@mui/material';

export interface ISettingsPagePros {}

const Settings: React.FC<ISettingsPagePros> = () => {
  const userId = Number(localStorage.getItem('user-id')!);
  const graph_width = window.innerWidth * 0.25;
  const graph_height = window.innerHeight * 0.3;
  const [average, setAverage] = useState<number>(0);
  const [averageWeekly, setAverageWeekly] = useState<number>(0);
  const [averageMonthly, setAverageMonthly] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [totalWeekly, setTotalWeekly] = useState<number>(0);
  const [totalMonthly, setTotalMonthly] = useState<number>(0);
  const [totalAll, setTotalAll] = useState<number>(0);
  const [totalWeeklyAll, setTotalWeeklyAll] = useState<number>(0);
  const [totalMonthlyAll, setTotalMonthlyAll] = useState<number>(0);
  const [totalDemo, setDemoTotal] = useState<number>(0);
  const [totalDemoWeekly, setDemoTotalWeekly] = useState<number>(0);
  const [avgDemo, setDemoAvg] = useState<number>(0);
  const [avgDemoWeekly, setDemoAvgWeekly] = useState<number>(0);
  const [over, setOver] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const today = new Date();

  const long_style = {
    position: 'relative',
    bgcolor: 'background.paper',
  };

  const short_style = {
    position: 'relative',
    bgcolor: 'bacground.paper',
    marginLeft: '1%',
    marginRight: '1%',
  };

  const getAverage = async (category?: string) => {
    let url: string = `http://localhost:3000/api/recommender/average?userId=${userId}`;
    if (category) {
      url += `&category=${category}`;
    }
    try {
      const response = await axios({
        method: 'GET',
        url: url,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAverage(Number(Number(response.data.average).toFixed(2)));
    } catch (error) {
      console.log(error);
    }
  };

  const getWeeklyAverage = async (category?: string) => {
    let url: string = `http://localhost:3000/api/recommender/weeklyAverage?userId=${userId}`;
    if (category) {
      url += `&category=${category}`;
    }
    try {
      const response = await axios({
        method: 'GET',
        url: url,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('weekly' + response.data.average);
      setAverageWeekly(Number(Number(response.data.average).toFixed(2)));
    } catch (error) {
      console.log(error);
    }
  };

  const getMonthlyAverage = async (month?: number, category?: string) => {
    let url: string = `http://localhost:3000/api/recommender/monthlyAverage?userId=${userId}`;
    if (month) {
      url += `&month=${month}`;
    }
    if (category) {
      url += `&category=${category}`;
    }
    try {
      const response = await axios({
        method: 'GET',
        url: url,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('monthly' + response.data.average);
      setAverageMonthly(Number(Number(response.data.average).toFixed(2)));
    } catch (error) {
      console.log(error);
    }
  };

  const getTotal = async (category?: string) => {
    let url: string = `http://localhost:3000/api/recommender/total?userId=${userId}`;
    if (category) {
      url += `&category=${category}`;
    }
    try {
      const response = await axios({
        method: 'GET',
        url: url,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTotal(Number(Number(response.data.total).toFixed(2)));
    } catch (error) {
      console.log(error);
    }
  };

  const getWeeklyTotal = async (category?: string) => {
    let url: string = `http://localhost:3000/api/recommender/weeklyTotal?userId=${userId}`;
    if (category) {
      url += `&category=${category}`;
    }
    try {
      const response = await axios({
        method: 'GET',
        url: url,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTotalWeekly(Number(Number(response.data.total).toFixed(2)));
    } catch (error) {
      console.log(error);
    }
  };

  const getMonthlyTotal = async (month?: number, category?: string) => {
    let url: string = `http://localhost:3000/api/recommender/monthlyTotal?userId=${userId}`;
    if (month) {
      url += `&month=${month}`;
    }
    if (category) {
      url += `&category=${category}`;
    }
    try {
      const response = await axios({
        method: 'GET',
        url: url,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTotalMonthly(Number(Number(response.data.total).toFixed(2)));
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalAll = async (category?: string) => {
    let url: string = `http://localhost:3000/api/recommender/total`;
    if (category) {
      url += `?category=${category}`;
    }
    try {
      const response = await axios({
        method: 'GET',
        url: url,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTotalAll(Number(Number(response.data.total).toFixed(2)));
    } catch (error) {
      console.log(error);
    }
  };

  const getWeeklyTotalAll = async (category?: string) => {
    let url: string = `http://localhost:3000/api/recommender/weeklyTotal`;
    if (category) {
      url += `?category=${category}`;
    }
    try {
      const response = await axios({
        method: 'GET',
        url: url,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTotalWeeklyAll(Number(Number(response.data.total).toFixed(2)));
    } catch (error) {
      console.log(error);
    }
  };

  const getMonthlyTotalAll = async (month?: number, category?: string) => {
    let url: string = `http://localhost:3000/api/recommender/monthlyTotal`;
    if (month) {
      url += `?month=${month}`;
      if (category) {
        url += `&category=${category}`;
      }
    } else if (category) {
      url += `?category=${category}`;
    }
    try {
      const response = await axios({
        method: 'GET',
        url: url,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTotalMonthlyAll(Number(Number(response.data.total).toFixed(2)));
    } catch (error) {
      console.log(error);
    }
  };

  const getSpending = async (month?: number, category?: string) => {
    let url: string = `http://localhost:3000/api/recommender/spendingNotification?userId=${userId}`;
    if (month) {
      url += `&month=${month}`;
    }
    if (category) {
      url += `&category=${category}`;
    }
    try {
      const response = await axios({
        method: 'GET',
        url: url,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setOver(response.data.targetCategories);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalDemo = async (month?: number, category?: string) => {
    let url: string = 'http://localhost:3000/api/recommender/weeklyTotal?userId=15';
    let u15: number = 0;
    let u16: number = 0;
    if (month) {
      url += `&month=${month}`;
    }
    if (category) {
      url += `&category=${category}`;
    }
    try {
      const response = await axios({
        method: 'GET',
        url: url,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      u15 = Number(Number(response.data.total).toFixed(2));
    } catch (error) {
      console.log(error);
    }
    url = 'http://localhost:3000/api/recommender/weeklyTotal?userId=16';
    if (month) {
      url += `&month=${month}`;
    }
    if (category) {
      url += `&category=${category}`;
    }
    try {
      const response = await axios({
        method: 'GET',
        url: url,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      u16 = Number(Number(response.data.total).toFixed(2));
    } catch (error) {
      console.log(error);
    }
    let total = Number(Number(u16 + u15)/2);
    setDemoTotal(Number(total));

    url = 'http://localhost:3000/api/recommender/monthlyTotal?userId=16';
    if (month) {
      url += `&month=${month}`;
    }
    if (category) {
      url += `&category=${category}`;
    }
    try {
      const response = await axios({
        method: 'GET',
        url: url,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      u16 = Number(Number(response.data.total).toFixed(2));
    } catch (error) {
      console.log(error);
    }
    url = 'http://localhost:3000/api/recommender/monthlyTotal?userId=16';
    if (month) {
      url += `&month=${month}`;
    }
    if (category) {
      url += `&category=${category}`;
    }
    try {
      const response = await axios({
        method: 'GET',
        url: url,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      u16 = Number(Number(response.data.total).toFixed(2));
    } catch (error) {
      console.log(error);
    }
    let total2 =Number(Number(u16 + u15)/2).toFixed(2);
    setDemoTotalWeekly(Number(total2));
  };

  const getTotalDemoAvg = async (category?: string) => {
    let url: string =
      'http://localhost:3000/api/recommender/weeklyAverage?userId=15';
    let u15: number = 0;
    let u16: number = 0;
    if (category) {
      url += `&category=${category}`;
    }
    try {
      const response = await axios({
        method: 'GET',
        url: url,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      u15 = Number(Number(response.data.average).toFixed(2));
    } catch (error) {
      console.log(error);
    }
    url = 'http://localhost:3000/api/recommender/weeklyAverage?userId=16';
    if (category) {
      url += `&category=${category}`;
    }
    try {
      const response = await axios({
        method: 'GET',
        url: url,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      u16 = Number(Number(response.data.average).toFixed(2));
    } catch (error) {
      console.log(error);
    }
    let total = Number(u16 + u15) / 2;
    setDemoAvgWeekly(Number(Number(total).toFixed(2)));
  };

  const getTotalDemoAvgMonth = async (month?: number, category?: string) => {
    let url: string =
      'http://localhost:3000/api/recommender/monthlyAverage?userId=15';
    let u15: number = 0;
    let u16: number = 0;
    if (month) {
      url += `&month=${month}`;
    }
    if (category) {
      url += `&category=${category}`;
    }
    try {
      const response = await axios({
        method: 'GET',
        url: url,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      u15 = Number(Number(response.data.average).toFixed(2));
    } catch (error) {
      console.log(error);
    }
    url = 'http://localhost:3000/api/recommender/monthAverage?userId=16';
    if (month) {
      url += `&month=${month}`;
    }
    if (category) {
      url += `&category=${category}`;
    }
    try {
      const response = await axios({
        method: 'GET',
        url: url,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      u16 = Number(Number(response.data.average).toFixed(2));
    } catch (error) {
      console.log(error);
    }
    let total = Number(u16 + u15) / 2;
    setDemoAvg(Number(Number(total).toFixed(2)));
  };

  useEffect(() => {
    getWeeklyAverage();
    getAverage();
    getMonthlyAverage();
    getTotal();
    getTotalAll();
    getWeeklyTotal();
    getWeeklyTotalAll();
    getMonthlyTotal();
    getMonthlyTotalAll();
    getSpending();
    getTotalDemo();
    getTotalDemoAvg();
    getTotalDemoAvgMonth();
  }, []);

  return (
    <>
      <Welcome>Recommender</Welcome>
      <div
        style={{
          background: '#F1FCFF',
          display: 'grid',
          gridTemplateRows: 'repeat(3, auto)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            background: '#F1FCFF',
            // display: 'grid',
            // gridTemplateColumns: '35% 65%',
            overflow: 'hidden',
            margin: '1%',
          }}
        >
          <Card sx={{ ...long_style }}>
            <CardHeader
              title="How's the budget looking?"
              subheader="And what can we do about it!"
            />
            <CardContent>
              {over.length == 0 && (
                <Typography variant="h5" color="text.secondary">
                  You currently are not over budget in any category! Keep up the
                  good work!
                </Typography>
              )}
              {over.length > 0 && (
                <div>
                  <TextField
                    id="select-item"
                    select
                    label="Select"
                    helperText="Select a Category"
                    defaultValue={0}
                  >
                    {over.map((option) => (
                      <MenuItem
                        key={option}
                        value={option}
                        onClick={(nextValue) => {
                          setSelectedValue(
                            nextValue.currentTarget.dataset.value
                              ? nextValue.currentTarget.dataset.value
                              : over[0]
                          );
                        }}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  {selectedValue && (
                    <Typography variant="h5" color="text.secondary">
                      You are currently over budget for products in the "
                      {selectedValue}" category this month, let's see what you
                      can do about it!
                    </Typography>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div
          style={{
            background: '#F1FCFF',
            display: 'grid',
            gridTemplateColumns: '33% 33% 33%',
            overflow: 'hidden',
            margin: '1%',
          }}
        >
          <Card sx={{ ...short_style }}>
            <CardHeader
              title="Weekly Spending"
              subheader={`Spending in the week of ${today.getFullYear()}-${
                today.getMonth() + 1
              }-${today.getDate()}`}
            />
            <CardContent>
              <ResponsiveContainer width={graph_width} height={graph_height}>
                <BarChart
                  data={[
                    { x: 'This week', spending: totalWeekly },
                    { x: 'All time', spending: total },
                  ]}
                  margin={{
                    top: graph_height * 0.1,
                    right: graph_width * 0.1,
                    left: graph_width * 0.05,
                    bottom: graph_height * 0.01,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="spending" fill="#8884d8" legendType="circle" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card sx={{ ...short_style }}>
            <CardHeader
              title="Weekly Spending Comparison"
              subheader={`Spending comparison in the week of ${today.getFullYear()}-${
                today.getMonth() + 1
              }-${today.getDate()}`}
            />
            <CardContent>
              <ResponsiveContainer width={graph_width} height={graph_height}>
                <BarChart
                  data={[
                    { x: 'Me', spending: totalWeekly },
                    { x: 'All Users', spending: totalDemoWeekly },
                  ]}
                  margin={{
                    top: graph_height * 0.1,
                    right: graph_width * 0.1,
                    left: graph_width * 0.05,
                    bottom: graph_height * 0.01,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="spending" fill="#82ca9d" legendType="circle" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card sx={{ ...short_style }}>
            <CardHeader
              title="Weekly Average Receipt"
              subheader={`Spending average in the week of ${today.getFullYear()}-${
                today.getMonth() + 1
              }-${today.getDate()}`}
            />
            <CardContent>
              <ResponsiveContainer width={graph_width} height={graph_height}>
                <BarChart
                  data={[
                    { x: 'Me', spending: averageWeekly },
                    { x: 'All Users', spending: avgDemoWeekly },
                  ]}
                  margin={{
                    top: graph_height * 0.1,
                    right: graph_width * 0.1,
                    left: graph_width * 0.05,
                    bottom: graph_height * 0.01,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="spending" fill="#F7A9A8" legendType="circle" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <div
          style={{
            background: '#F1FCFF',
            display: 'grid',
            gridTemplateColumns: '33% 33% 33%',
            overflow: 'hidden',
            margin: '1%',
          }}
        >
          <Card sx={{ ...short_style }}>
            <CardHeader
              title="Monthly Spending"
              subheader={`Spending in the month of ${today.toLocaleString(
                'default',
                { month: 'long' }
              )} ${today.getFullYear()}`}
            />
            <CardContent>
              <ResponsiveContainer width={graph_width} height={graph_height}>
                <BarChart
                  data={[
                    { x: 'This Month', spending: totalMonthly },
                    { x: 'All time', spending: total },
                  ]}
                  margin={{
                    top: graph_height * 0.1,
                    right: graph_width * 0.1,
                    left: graph_width * 0.05,
                    bottom: graph_height * 0.01,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="spending" fill="#8884d8" legendType="circle" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card sx={{ ...short_style }}>
            <CardHeader
              title="Monthly Spending Comparison"
              subheader={`Spending comparison in the month of ${today.toLocaleString(
                'default',
                { month: 'long' }
              )} ${today.getFullYear()}`}
            />
            <CardContent>
              <ResponsiveContainer width={graph_width} height={graph_height}>
                <BarChart
                  data={[
                    { x: 'Me', spending: totalMonthly },
                    { x: 'All Users', spending: totalDemo },
                  ]}
                  margin={{
                    top: graph_height * 0.1,
                    right: graph_width * 0.1,
                    left: graph_width * 0.05,
                    bottom: graph_height * 0.01,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="spending" fill="#82ca9d" legendType="circle" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card sx={{ ...short_style }}>
            <CardHeader
              title="Monthly Average Receipt"
              subheader={`Spending average in the month of ${today.toLocaleString(
                'default',
                { month: 'long' }
              )} ${today.getFullYear()}`}
            />
            <CardContent>
              <ResponsiveContainer width={graph_width} height={graph_height}>
                <BarChart
                  data={[
                    { x: 'Me', spending: averageMonthly },
                    { x: 'All Users', spending: avgDemo },
                  ]}
                  margin={{
                    top: graph_height * 0.1,
                    right: graph_width * 0.1,
                    left: graph_width * 0.05,
                    bottom: graph_height * 0.01,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="spending" fill="#F7A9A8" legendType="circle" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
      <EndCard>This is still in its Beta*</EndCard>
    </>
  );
};

export default Settings;
