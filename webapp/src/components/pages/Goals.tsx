import '../../App.css'
import React from "react";
import { Button } from '../Button'
import { Goalform } from "../Goalform";

export interface IGoalsPageProps {};

const Goals: React.FunctionComponent<IGoalsPageProps> = props => {
    return (
        <>
            <div>This is the Goals Page</div>
            <div>TODO: Delete and modify goals</div>
            <Goalform/>
        </>
    )
}

export default Goals;
