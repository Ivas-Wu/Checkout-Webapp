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
  ResponsiveContainer,
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
  month: number;
  activeDate: (months:boolean[], years:number[]) => void;
}

export interface GraphReq {
  date: Date;
  amt: number;
  category: Category;
}

interface TimeGraphReq {
  month: number;
  year: number;
  data: GraphReq[];
}

interface TimeTotals {
  month: number;
  year: number;
  total: number;
}

const Graphs: React.FC<IGraphsProps> = ({ graph, width, height, target, month, activeDate }) => {
  const userId = localStorage.getItem('user-id');
  const [graphDataTime, setDataTime] = useState<GraphReq[]>([]);
  const [totalA, setTotalA] = useState<TimeTotals[]>([]);
  const containerWidth = width ? width : window.innerWidth * 0.5;
  const containerHeight = height ? height : window.innerWidth * 0.5;

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [month]);

  function convertReceipts(data: Receipt[]): TimeGraphReq[] {
    let returnValue: TimeGraphReq[] = [];
    let totals: TimeTotals[] = [];
    data.forEach(function (data) {
      const newData = {
        date: data.date ? data.date : data.createdAt,
        amt: data.total,
        category: data.category
          ? convertCategory(data.category)
          : Category.OTHER,
      };
      var date = new Date(newData.date);
      let found = returnValue.find(function (element) {
        if (element.month === date.getMonth()) {
          return element;
        }
        return null;
      });
      if (found != null) {
        found.data.push(newData);
      } else {
        const newVal = {
          month: date.getMonth(),
          year: date.getFullYear(),
          data: [newData],
        };
        returnValue.push(newVal);
      }
      let found2 = totals.find(function (element) {
        if (element.month === date.getMonth()) {
          return element;
        }
        return null;
      });
      if (found2 != null) {
        found2.total += Number(Number(data.total).toFixed(2));
      } else {
        const newVal = {
          month: date.getMonth(),
          year: date.getFullYear(),
          total: Number(Number(data.total).toFixed(2)),
        };
        totals.push(newVal);
      }
    });
    setTotalA(totals);
    return returnValue;
  }

  const getData = () => {
    axios
      .get(`http://localhost:3000/api/receipts?userId=${userId}`)
      .then((res) => {
        let data: TimeGraphReq[] = convertReceipts(res.data);
        let found = data.find(element => element.month == month);
        setDataTime(found ? found.data : data[0].data);
        updateDate(data);
      });
  };

  const updateDate = (data: TimeGraphReq[]) => {
    let months = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    let years:number[] = [];
    data.forEach(element => {
      months[element.month] = true;
      if (!years.find(x => x == element.year)){
        years.push(element.year);
      }
    });
    years = years.sort((n1,n2) => n1 - n2)
    activeDate(months, years);
  };

  if (graph === charts.BAR) {
    return (
      <ResponsiveContainer width={containerWidth} height={containerHeight}>
        <BarChart
          data={dataGenBar(graphDataTime, target)!}
          margin={{
            top: containerHeight * 0.1,
            right: containerWidth * 0.1,
            left: containerWidth * 0.05,
            bottom: containerHeight * 0.01,
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
          data={dataGenBar(graphDataTime, target)!}
          margin={{
            top: containerHeight * 0.1,
            right: containerWidth * 0.1,
            left: containerWidth * 0.05,
            bottom: containerHeight * 0.01,
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
          <Line dataKey="Total" stroke="#64c2f5" legendType="circle" />
          <Line dataKey="Budget" stroke="#f57d87" legendType="circle" />
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

    const COLORS2 = ['#64c2f5', '#f57d87', '#82e0a5'];

    const compare = [
      { name: 'On Budget', value: 0 },
      { name: 'Over Budget', value: 0 },
      { name: 'Under Budget', value: 0 },
    ];

    graphDataTime.forEach(function (data) {
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

    d.forEach(function (d2) {
      d2.value = Number(Number(d2.value).toFixed(2));
    });

    let found = totalA.find(element => element.month == month);
    let totalFound = found ? found.total : 0;
    if (totalFound > target) {
      compare[1].value += totalFound - target;
      compare[0].value += target;
    } else {
      compare[2].value += target - totalFound;
      compare[0].value += totalFound;
    }
    compare[0].value = Number(Number(compare[0].value).toFixed(2));
    compare[1].value = Number(Number(compare[1].value).toFixed(2));
    compare[2].value = Number(Number(compare[2].value).toFixed(2));

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
          <Legend
            layout={'vertical'}
            verticalAlign={'middle'}
            align={'right'}
          />
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
