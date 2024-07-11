import React from 'react';
import { requestObj } from '../../types';
import './Card.scss';

type CardProps = {
  card: requestObj;
  currentElement: string;
  setCurrentElement: (url: string) => void;
};

function Card({ card, currentElement, setCurrentElement }: CardProps) {
  return (
    <li
      className={currentElement === card.url ? 'list-item-active' : 'list-item'}
      onClick={() => {
        setCurrentElement(currentElement === card.url ? '' : card.url);
      }}
    >
      <h3 className="list-item-header">{card.name}</h3>
      <div>
        <span className="list-item-desc">Height: </span>
        <span>{card.height}</span>
      </div>
      <div>
        <span className="list-item-desc">Weight: </span>
        <span>{card.mass}</span>
      </div>
      <div>
        <span className="list-item-desc">Color skin: </span>
        <span>{card.skin_color}</span>
      </div>
      <div>
        <span className="list-item-desc">Color hair: </span>
        <span>{card.hair_color}</span>
      </div>
    </li>
  );
}

export default Card;
