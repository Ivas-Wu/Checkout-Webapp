import '../../App.css';
import React from 'react';
import { Goalform } from '../Goalform';
import { Reminderform } from '../ReminderForm';
import { Welcome, EndCard } from './pages.styled';
import BasicTabs from '../TabPanel';

export interface IGoalsPageProps {}

const Goals: React.FC<IGoalsPageProps> = () => {
  return (
    <>
      <Welcome>This is the Goals Page</Welcome>
      <BasicTabs labels={["Goals", "Reminders"]} values={[<Goalform />, <Reminderform />]}></BasicTabs>
      <EndCard>Create and manage your goals and reminders!</EndCard>
    </>
  );
};

export default Goals;
