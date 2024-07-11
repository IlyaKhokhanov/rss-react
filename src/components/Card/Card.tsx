import { Link } from 'react-router-dom';
import { requestObj } from '../../types';
import './Card.scss';

type CardProps = {
  card: requestObj;
  currentElement: string;
  setCurrentElement: (url: string) => void;
};

function Card({ card, currentElement, setCurrentElement }: CardProps) {
  const isActive =
    currentElement === card.url.split('/')[card.url.split('/').length - 2];

  return (
    <Link
      className={isActive ? 'list-item-active' : 'list-item'}
      to={
        isActive
          ? ''
          : `details/${card.url.split('/')[card.url.split('/').length - 2]}`
      }
      onClick={() => {
        setCurrentElement(
          isActive ? '' : card.url.split('/')[card.url.split('/').length - 2],
        );
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
    </Link>
  );
}

export default Card;
