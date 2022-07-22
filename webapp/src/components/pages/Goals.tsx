import '../../App.css';
import React from 'react';
import { Goalform } from '../Goalform';
import { Welcome, Body } from './pages.styled';

export interface IGoalsPageProps {}

const Goals: React.FC<IGoalsPageProps> = () => {
  return (
    <>
      <Welcome>This is the Goals Page</Welcome>
      <Goalform />
    </>
  );
};

export default Goals;
