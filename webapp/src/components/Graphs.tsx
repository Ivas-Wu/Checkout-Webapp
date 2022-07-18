import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
} from 'recharts';

export enum charts {
  NONE = 'NONE',
  PI = 'PI',
  LINE = 'LINE',
  BAR = 'BAR',
}

export interface IGraphsProps {
  graph: charts;
}

interface Receipt { //TOMOVE
  id: number,
  createdAt: Date,
  updatedAt: Date,
  store: string, //enum?
  category: string, //enum for sure TODO
  total: number,
  date: Date,
}

interface GraphReq {
  date: Date,
  amt: number,
  category: string,
  food?: number,
  entertainment?: number,
}

const Graphs: React.FC<IGraphsProps> = ({ graph }) => {
  const userId = 1;
  const [graphData, setDate] = useState<GraphReq[]>([]);
  useEffect(() => {
    getData();
  }, []);

  function convertGoals(data: Receipt[]): GraphReq[] {
    let returnValue: GraphReq[] = [];
    data.forEach(function (data) {
      const newData = {
        date: data.date,
        amt: data.total,
        category: data.category,
        food: data.total/2,
        entertainment: data.total/2.5
      };
      returnValue.push(newData);
    });
    return returnValue;
  }

  const getData = () => {
    axios
      .get(`http://localhost:3000/api/receipts?userId=${userId}`)
      .then((res) => {
        let data: GraphReq[] = convertGoals(res.data);
        setDate(data);
        console.log(res.data)
      });
  };

  if (graph === charts.BAR) {
    return (
      <BarChart
        width={500}
        height={300}
        data={graphData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="food" fill="#8884d8" />
        <Bar dataKey="entertainment" fill="#82ca9d" />
        <Bar dataKey="amt" fill="#F7A9A8" />
      </BarChart>
    );
  } else if (graph === charts.LINE) {
    return (
      <LineChart
        width={500}
        height={300}
        data={graphData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="food" stroke="#8884d8" />
        <Line type="monotone" dataKey="entertainment" stroke="#82ca9d" />
        <Line type="monotone" dataKey="amt" stroke="#F7A9A8" />
      </LineChart>
    );
  } else if (graph === charts.PI) {
    const data01 = [
      { name: 'Food', value: 400 },
      { name: 'Entertainment', value: 300 },
      { name: 'Medical', value: 300 },
      { name: 'Transportation', value: 200 },
      { name: 'Housing', value: 278 },
      { name: 'Utilities', value: 189 },
    ];

    //TODO parsing data

    return (
      <PieChart width={1000} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data01}
          cx={200}
          cy={200}
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    );
  } else {
    return (
      <>
        <div>Other</div>
      </>
    );
  }
};

export default Graphs;
