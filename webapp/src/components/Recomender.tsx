import React, { useState } from 'react';
import axios from 'axios';
import './Recomender.css';

export interface IRecomenderProps {}

const Recomender: React.FC<IRecomenderProps> = () => {
  const userId = localStorage.getItem('user-id');
  const [recomendationIs, setRecomendationIs] = useState<boolean>(false);
  const [recomendation, setRecomendation] = useState<string>('');
  const [average, setAverage] = useState<number>(0);
  const [averageWeekly, setAverageWeekly] = useState<number>(0);
  const [averageMonthly, setAverageMonthly] = useState<number>(0);

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
      setAverage(response.data.average);
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
      setAverageWeekly(response.data.average);
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
      setAverageMonthly(response.data.average);
    } catch (error) {
      console.log(error);
    }
  };

  const generateRecomendation = () => {
    let num: number = Math.floor(Math.random() * 1000); //WA, MA,
    let rec: string = 'You have an average spending of ';
    let value: string = '';
    if (num % 2 === 0) {
      if (num % 5 === 0) {
        getMonthlyAverage(7, 'Groceries');
        getAverage('Groceries');
        value = ' on groceries';
      } else {
        getMonthlyAverage(7);
        getAverage();
      }
      rec += Number(averageMonthly).toFixed(2);
      rec += ` this month${value}, compared to your overall average of `;
      rec += Number(average).toFixed(2);
      rec +=
        averageMonthly > average ? '... Unlucky.' : '! You are doing great!';
    } else {
      if (num % 5 === 0) {
        getWeeklyAverage('Groceries');
        getAverage('Groceries');
        value = ' on groceries';
      } else {
        getWeeklyAverage();
        getAverage();
      }
      rec += Number(averageWeekly).toFixed(2);
      rec += ` this week${value}, compared to your overall average of `;
      rec += Number(average).toFixed(2);
      rec +=
        averageWeekly > average ? '... Unlucky.' : '! You are doing great!';
    }

    setRecomendation(rec);
    setRecomendationIs(true);
  };

  return (
    <div className="recomendations-wrapper">
      <button onClick={generateRecomendation}>Get a Recomendation!</button>
      {recomendationIs && <div>{recomendation}</div>}
    </div>
  );
};

export default Recomender;
