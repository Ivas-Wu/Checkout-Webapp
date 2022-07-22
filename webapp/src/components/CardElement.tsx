import { CardItem } from './CardItem';
import { ExpandedListItem, ListItem } from './CardListItem';

interface ICardElementProps {
  index: string[];
  key: number;
  state?: string;
  onClick: (index: string) => void;
  image: string;
}

export const CardElement: React.FC<ICardElementProps> = ({
  index,
  key,
  state,
  onClick,
  image,
}) => {
  return (
    <>
      <CardItem image={image}></CardItem>
      <li key={key}>
        {index.toString() === state ? (
          <ExpandedListItem index={state} onClick={onClick} listData={index} />
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
};

export default CardElement;
