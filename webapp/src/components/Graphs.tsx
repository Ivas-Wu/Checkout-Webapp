import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Category, convertCategory } from '../types/Category';
import { Receipt } from '../types/Receipt'
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
} from 'recharts';
import { dataGenBar } from './GraphData';

export enum charts {
  NONE = 'NONE',
  PI = 'PI',
  LINE = 'LINE',
  BAR = 'BAR',
}

export interface IGraphsProps {
  graph: charts;
}

export interface GraphReq {
  date: Date;
  amt: number;
  category: Category;
}

const Graphs: React.FC<IGraphsProps> = ({ graph }) => {
  const userId = 1;
  const [graphData, setData] = useState<GraphReq[]>([]);
  useEffect(() => {
    getData();
  }, []);

  function convertGoals(data: Receipt[]): GraphReq[] {
    let returnValue: GraphReq[] = [];
    data.forEach(function (data) {
      const newData = {
        date: data.date ? data.date : data.createdAt,
        amt: data.total,
        category: data.category ? convertCategory(data.category) : Category.OTHER,
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
        setData(data);
        console.log(res.data);
      });
  };
  if (graph === charts.BAR) {
    return (
      <BarChart
        width={500}
        height={300}
        data={dataGenBar(graphData)!}
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
        <Bar dataKey="Groceries" fill="#8884d8" legendType="circle" />
        <Bar dataKey="Entertainment" fill="#82ca9d" legendType="circle" />
        <Bar dataKey="Medical" fill="#F7A9A8" legendType="circle" />
        <Bar dataKey="Transportation" fill="#BF1A2F" legendType="circle" />
        <Bar dataKey="Housing" fill="#0B3954" legendType="circle" />
        <Bar dataKey="Utilities" fill="#F49F0A" legendType="circle" />
        <Bar dataKey="Other" fill="#EFCA08" legendType="circle" />
      </BarChart>
    );
  } else if (graph === charts.LINE) {
    return (
      <LineChart
        width={500}
        height={300}
        data={dataGenBar(graphData)!}
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
        <Line dataKey="Groceries" stroke="#8884d8" legendType="circle" />
        <Line dataKey="Entertainment" stroke="#82ca9d" legendType="circle" />
        <Line dataKey="Medical" stroke="#F7A9A8" legendType="circle" />
        <Line dataKey="Transportation" stroke="#BF1A2F" legendType="circle" />
        <Line dataKey="Housing" stroke="#0B3954" legendType="circle" />
        <Line dataKey="Utilities" stroke="#F49F0A" legendType="circle" />
        <Line dataKey="Other" stroke="#EFCA08" legendType="circle" />
      </LineChart>
    );
  } else if (graph === charts.PI) {
    const COLORS = [
      '#8884d8',
      '#82ca9d',
      '#FFBB28',
      '#FF8042',
      '#0088EE',
      '#00D49F',
      '#FFBB27',
    ];

    const d = [
      { name: 'Other', value: 0 },
      { name: 'Groceries', value: 0 },
      { name: 'Entertainment', value: 0 },
      { name: 'Medical', value: 0 },
      { name: 'Transportation', value: 0 },
      { name: 'Housing', value: 0 },
      { name: 'Utilities', value: 0 },
    ];

    graphData.forEach(function (data) {
      let flag = false;
      d.forEach(function (d2) {
        if (convertCategory(d2.name) === data.category) {
          d2.value = d2.value + Number(data.amt);
          flag = true;
        }
      });
      if (!flag) {
        console.log(typeof data.amt);
        d[0].value = d[0].value + Number(data.amt);
      }
    });

    return (
      <PieChart width={1000} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={d}
          cx={200}
          cy={200}
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
        {d.map((entry, index) => (
          <Cell key="Groceries" fill={COLORS[index]} />
        ))}
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
