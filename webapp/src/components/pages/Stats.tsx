import '../../App.css'
import Graphs, {charts} from '../Graphs'
import { useState } from 'react'

export interface IStatisticsPageProps {};

const Statistics: React.FC<IStatisticsPageProps> = () => {
    const [showBar, setBar] = useState(false);
    const [showLine, setLine] = useState(false);
    const [showPi, setPi] = useState(false);

    const setGraphs = (graph:charts) => {
        if (graph === charts.BAR) {
            setBar(prev => !prev);
            setLine(false);
            setPi(false);
        }
        else if (graph === charts.LINE) {
            setLine(prev => !prev);
            setBar(false);
            setPi(false);
        }
        else if (graph === charts.PI) {
            setPi(prev => !prev);
            setLine(false);
            setBar(false);
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
            <div>Can try using this https://jquense.github.io/react-widgets/docs/Dropdowns</div>
            <button onClick={() => setGraphs(charts.BAR)}>Bar</button>
            <button onClick={() => setGraphs(charts.LINE)}>Line</button>
            <button onClick={() => setGraphs(charts.PI)}>Pi</button>
            {showBar && <Graphs graph={charts.BAR} />}
            {showLine && <Graphs graph={charts.LINE} />}
            {showPi && <Graphs graph={charts.PI} />}
        </>
    )
}

export default Statistics;