import '../../App.css';
import Graphs, { charts } from '../Graphs';
import { useState } from 'react';
import DropdownList from 'react-widgets/DropdownList';
import 'react-widgets/styles.css';
import { Welcome, Body, Drop } from './pages.styled';
import Recomender from '../Recomender';

export interface IStatisticsPageProps {}

const Statistics: React.FC<IStatisticsPageProps> = () => {
  const [showNone, setNone] = useState(false);
  const [showBar, setBar] = useState(false);
  const [showLine, setLine] = useState(false);
  const [showPi, setPi] = useState(false);

  const setGraphs = (graph: charts) => {
    if (graph === charts.BAR) {
      setBar(true);
      setLine(false);
      setPi(false);
      setNone(false);
    } else if (graph === charts.LINE) {
      setLine(true);
      setBar(false);
      setPi(false);
      setNone(false);
    } else if (graph === charts.PI) {
      setPi(true);
      setLine(false);
      setBar(false);
      setNone(false);
    } else if (graph === charts.NONE) {
      setPi(false);
      setLine(false);
      setBar(false);
      setNone(true);
    } else {
      setLine(false);
      setPi(false);
      setBar(false);
    }
  };

  return (
    <>
      <Welcome>This is the Statistics Page</Welcome>
      <Body>Here you can view graphs with your statistics!</Body>
      <Drop>
        <DropdownList
          defaultValue={() => {
            setGraphs(charts.NONE);
          }}
          data={Object.values(charts).filter(
            (value) => typeof value === 'string'
          )}
          onChange={(nextValue) => {
            setGraphs(nextValue);
          }}
        />
      </Drop>
      {showNone && (
        <div>
          <div style={{marginBottom: '15px', display: 'flex', justifyContent: 'center'}}>Proto-type Recomender</div>
          <Recomender></Recomender>
        </div>
      )}
      {showBar && <div style={{ display: 'flex', justifyContent: 'center' }}> <Graphs graph={charts.BAR} /> </div>}
      {showLine && <div style={{ display: 'flex', justifyContent: 'center' }}> <Graphs graph={charts.LINE} /> </div>}
      {showPi && <div style={{ display: 'flex', justifyContent: 'center' }}> <Graphs graph={charts.PI} /> </div>}
    </>
  );
};

export default Statistics;
