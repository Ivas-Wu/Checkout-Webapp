import { useState } from "react";
import { Flipper } from "react-flip-toolkit";
import CardElement from "./CardElement";
import './CardListAnimated.css'

interface IAnimatedListProps {
    listData : string[][];
}

export const AnimatedList : React.FC<IAnimatedListProps> = ({listData}) => {
    const [state, setState] = useState<string>();
    const onClick = (index:string) => {
        console.log(listData)
        setState(state === index ? undefined : index);
    }
    return (
        <div className="cardList">
            <Flipper
            flipKey={state}
            className="staggered-list-content"
            spring="gentle"
            staggerConfig={{
                card: {
                reverse: state !== null
                }
            }}
            decisionData={state}
            >
            <ul className="list">
                {listData.map(index => {
                return (
                    <CardElement 
                      key={listData.indexOf(index)} 
                      index={index} 
                      state={state} 
                      onClick={onClick} 
                      front={index.at(5)!}
                      back={index.at(6)!} />
                );
                })}
            </ul>
            </Flipper>
        </div>
    );
}
  
export default AnimatedList;