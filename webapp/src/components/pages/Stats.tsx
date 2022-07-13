import '../../App.css'
import Graphs, {charts} from '../Graphs'
import { useState } from 'react'
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";

export interface IStatisticsPageProps {};

const Statistics: React.FC<IStatisticsPageProps> = () => {
    const [showNone, setNone] = useState(false);
    const [showBar, setBar] = useState(false);
    const [showLine, setLine] = useState(false);
    const [showPi, setPi] = useState(false);

    const setGraphs = (graph:charts) => {
        if (graph === charts.BAR) {
            setBar(true);
            setLine(false);
            setPi(false);
            setNone(false);
        }
        else if (graph === charts.LINE) {
            setLine(true);
            setBar(false);
            setPi(false);
            setNone(false);
        }
        else if (graph === charts.PI) {
            setPi(true);
            setLine(false);
            setBar(false);
            setNone(false);
        }
        else if (graph === charts.NONE) {
            setPi(false);
            setLine(false);
            setBar(false);
            setNone(true);
        }
        else {
            setLine(false);
            setPi(false);
            setBar(false);
        }
    }

    return (
        <>
            <div>This is the Statistics Page</div>
            {/* <div>Can try using this https://jquense.github.io/react-widgets/docs/Dropdowns</div>
            <button onClick={() => setGraphs(charts.BAR)}>Bar</button>
            <button onClick={() => setGraphs(charts.LINE)}>Line</button>
            <button onClick={() => setGraphs(charts.PI)}>Pi</button> */}
            <DropdownList
            defaultValue={() => {setGraphs(charts.NONE)}}
            data={Object.values(charts).filter(value => typeof value === 'string')}
            onChange={(nextValue) => {setGraphs(nextValue)}}
            />
            {showNone && (<div>Some Default Stats page here</div>)}
            {showBar && <Graphs graph={charts.BAR} />}
            {showLine && <Graphs graph={charts.LINE} />}
            {showPi && <Graphs graph={charts.PI} />}
        </>
    )
}

export default Statistics;