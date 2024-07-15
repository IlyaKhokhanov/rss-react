import { Link } from 'react-router-dom';
import { requestObj } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentElement } from '../../redux/slices/application';
import './Card.scss';

type CardProps = {
  card: requestObj;
};

function Card({ card }: CardProps) {
  const dispatch = useAppDispatch();
  const { currentElement } = useAppSelector((state) => state.application);

  const cardId = card.url.split('/')[card.url.split('/').length - 2];
  const isActive = currentElement === cardId;

  return (
    <Link
      className={isActive ? 'list-item-active' : 'list-item'}
      to={isActive ? '' : `details/${cardId}`}
      onClick={() => {
        dispatch(setCurrentElement(isActive ? '' : cardId));
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
