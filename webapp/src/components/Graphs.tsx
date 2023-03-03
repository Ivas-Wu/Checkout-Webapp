import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Category, convertCategory } from '../types/Category';
import { Receipt } from '../types/Receipt';
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
  ResponsiveContainer
} from 'recharts';
import { dataGenBar } from './GraphData';

export enum charts {
  NONE = 'RECCOMENDATION',
  PI = 'PI',
  LINE = 'LINE',
  BAR = 'BAR',
}

export interface IGraphsProps {
  graph: charts;
  width?: number;
  height?: number;
  target: number;
}

export interface GraphReq {
  date: Date;
  amt: number;
  category: Category;
}

const Graphs: React.FC<IGraphsProps> = ({ graph, width, height, target }) => {
  const userId = localStorage.getItem('user-id');
  const [graphData, setData] = useState<GraphReq[]>([]);
  const [totalA, setTotalA] = useState<number>(0);
  const containerWidth = width? width : window.innerWidth*0.5;
  const containerHeight = height? height : window.innerWidth*0.5;
  useEffect(() => {
    getData();
  }, []);

  function convertReceipts(data: Receipt[]): GraphReq[] {
    let returnValue: GraphReq[] = [];
    let total = 0;
    data.forEach(function (data) {
      const newData = {
        date: data.date ? data.date : data.createdAt,
        amt: data.total,
        category: data.category
          ? convertCategory(data.category)
          : Category.OTHER,
      };
      total += Number(data.total);
      returnValue.push(newData);
    });
    setTotalA(total);
    return returnValue;
  }

  const getData = () => {
    axios
      .get(`http://localhost:3000/api/receipts?userId=${userId}`)
      .then((res) => {
        let data: GraphReq[] = convertReceipts(res.data);
        setData(data);
        console.log(res.data);
      });
  };

  if (graph === charts.BAR) {
    return (
      <ResponsiveContainer width={containerWidth} height={containerHeight}>
        <BarChart
          data={dataGenBar(graphData)!}
          margin={{
            top: containerHeight*.1,
            right: containerWidth*0.1,
            left: containerWidth*0.05,
            bottom: containerHeight*.01,
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
      </ResponsiveContainer>
    );
  } else if (graph === charts.LINE) {
    return (
      <ResponsiveContainer width={containerWidth} height={containerHeight}>
        <LineChart
          data={dataGenBar(graphData)!}
          margin={{
            top: containerHeight*.1,
            right: containerWidth*0.1,
            left: containerWidth*0.05,
            bottom: containerHeight*.01,
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
      </ResponsiveContainer>
    );
  } else if (graph === charts.PI) {
    const COLORS = [
      '#EFCA08',
      '#8884d8',
      '#82ca9d',
      '#F7A9A8',
      '#BF1A2F',
      '#0B3954',
      '#F49F0A',
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

    const COLORS2 = [
      '#EFCA08',
      '#8884d8',
      '#82ca9d',
    ];

    const compare = [
      { name: 'On Budget', value: 0 },
      { name: 'Over Budget', value: 0 },
      { name: 'Under Budget', value: 0 },
    ];

    graphData.forEach(function (data) {
      let flag = false;
      d.forEach(function (d2) {
        if (convertCategory(d2.name) === data.category) {
          d2.value += Number(data.amt);
          flag = true;
        }
      });
      if (!flag) {
        console.log(typeof data.amt);
        d[0].value += Number(data.amt);
      }
    });

    if (totalA > target){
      compare[1].value += totalA-target;
      compare[0].value += target;
    }
    else {
      compare[2].value += target-totalA;
      compare[0].value += totalA;
      console.log(totalA);
    }


    return (
      <ResponsiveContainer width={containerWidth} height={containerHeight}>
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={d}
            cx={'40%'}
            cy={'50%'}
            outerRadius={'70%'}
            // innerRadius={'60%'}
            fill="#8884d8"
          >
            {d.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={compare}
            cx={'40%'}
            cy={'50%'}
            outerRadius={'90%'}
            innerRadius={'80%'}
            fill="#8884d8"
          >
            {d.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS2[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout={"vertical"} verticalAlign={"middle"} align={"right"}/>
        </PieChart>
      </ResponsiveContainer>
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
