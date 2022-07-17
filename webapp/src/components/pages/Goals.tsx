import '../../App.css';
import React, { useEffect, useState } from 'react';
import { Goalform } from '../Goalform';
import { Welcome, Body} from './pages.styled'
import axios from 'axios'

export interface IGoalsPageProps {}

type Goal = {
  id: number,
  goalName: string,
}

const Goals: React.FC<IGoalsPageProps> = () => {
  const [goals, setGoals] = useState<[Goal]>();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/goals?userId=1`)
    .then(res => {
      const goals = res.data;
      setGoals(goals);
    })
  }, []);

  return (
    <>
      <Welcome>This is the Goals Page</Welcome>
      <Body>Write something here</Body>
      <ul>
        {goals &&
          goals
            .map(goal =>
              <li key={goal.id}>{goal.goalName}</li>
            )
        }
      </ul>
      <Goalform />
    </>
  );
};

export default Goals;
