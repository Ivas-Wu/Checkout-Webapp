// import ReactCardFlip from "react-card-flip";
import React, { useState } from 'react';
import './CardItem.css';

interface ICardItemProps {
  image: string;
}

export const CardItem: React.FC<ICardItemProps> = ({ image }) => {
  const [flipped, setFlipped] = useState<boolean>(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    <>
      <div onClick={handleClick}>
        <img className="card-back" src={image} alt="card back" />
      </div>
    </>
  );
};

export default CardItem;
