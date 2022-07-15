import ReactCardFlip from "react-card-flip";
import React, { useState } from "react"
import './CardItem.css'

interface ICardItemProps {
  front : string,
  back : string
};

export const CardItem: React.FC<ICardItemProps> = ({front, back}) => {
    const [flipped, setFlipped] = useState<boolean>(false);

    const handleClick = () => {
        setFlipped(!flipped);
    };

    return (
        <ReactCardFlip
        isFlipped={flipped}
        flipDirection="horizontal"
      >
        <div onClick={handleClick}>
          <img
            className="card-back"
            src={back}
            alt="card back"
          />
        </div>
        <div onClick={handleClick}>
          <img
            className="card-front"
            src={front}
            alt="card face"
          />
        </div>
      </ReactCardFlip>
    );
}

export default CardItem;