import React from "react";
import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; 

export enum charts {
    NONE = "NONE",
    PI = "PI",
    LINE = "LINE",
    BAR = "BAR",
}

export interface IGraphsProps {
    graph: charts;
};

const data = [
    {
      date: 'July 7',
      food: 90,
      entertainment: 40,
      amt: 130,
    },
    {
      date: 'July 1',
      food: 30,
      entertainment: 20,
      amt: 50,
    },
    {
      date: 'June 25',
      food: 40,
      entertainment: 20,
      amt: 60,
    },
    {
      date: 'June 17',
      food: 70,
      entertainment: 50,
      amt: 120,
    },
    {
      date: 'June 10',
      food: 45,
      entertainment: 10,
      amt: 55,
    },
    {
      date: 'June 2',
      food: 100,
      entertainment: 35,
      amt: 135,
    },
    {
      date: 'May 21',
      food: 150,
      entertainment: 50,
      amt: 200,
    },
  ];
  

const Graphs: React.FC<IGraphsProps> = ({graph}) => {
    if (graph === charts.BAR) {
        return (
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
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
    }
    else if (graph === charts.LINE) {
        return (
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey='date'/>
              <YAxis/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="entertainment" stroke="#8884d8"/>
              <Line type="monotone" dataKey="food" stroke="#82ca9d" />
              <Line type="monotone" dataKey="amt" stroke="#F7A9A8" />
            </LineChart>
          );
    }
    else if (graph === charts.PI) {
        
        const data01 = [
            { name: "Food", value: 400 },
            { name: "Entertainment", value: 300 },
            { name: "Medical", value: 300 },
            { name: "Transportation", value: 200 },
            { name: "Housing", value: 278 },
            { name: "Utilities", value: 189 }
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
        )
    }
    else {
        return (
            <>
                <div>Other</div>
            </>
        )
    }
}

export default Graphs;