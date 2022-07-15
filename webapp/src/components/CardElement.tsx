import {CardItem} from './CardItem' 
import { ExpandedListItem, ListItem } from './CardListItem';

interface ICardElementProps {
    index : string[],
    key : number,
    state? : string,
    onClick: (index:string) => void,
    front: string,
    back: string
}

export const CardElement : React.FC<ICardElementProps> = ({index, key, state, onClick, front, back}) => {
    return (
    <>  
        <CardItem front={front} back={back}></CardItem>
        <li key={key}>
        {index.toString() === state ? (
            <ExpandedListItem
            index={state}
            onClick={onClick}
            listData={index}
            />
        ) : (
            <ListItem 
            index={index.toString()} 
            key={key} 
            onClick={onClick} 
            listData={index}
            />
        )}
        </li>
    </>
);
}

export default CardElement