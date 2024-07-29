import { requestObj } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentElement } from '../../redux/slices/application';
import './Card.scss';
import { deleteItem, setItem } from '../../redux/slices/selectedItems';
import { useMemo } from 'react';

type CardProps = {
  card: requestObj;
};

function Card({ card }: CardProps) {
  const dispatch = useAppDispatch();
  const { currentElement } = useAppSelector((state) => state.application);
  const { selectedList } = useAppSelector((state) => state.selectedItems);

  const cardId = card.url.split('/')[card.url.split('/').length - 2];
  const isActive = currentElement === cardId;
  const isSelected = useMemo(
    () => Boolean(selectedList.find((el) => el.id === cardId)),
    [selectedList, cardId],
  );

  function checkHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    if (isSelected) {
      dispatch(deleteItem(cardId));
    } else {
      dispatch(setItem({ id: cardId, url: card.url, name: card.name }));
    }
  }

  return (
    <li
      className={isActive ? 'list-item-active' : 'list-item'}
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
      <div className="item-checkbox" onClick={checkHandler}>
        <input type="checkbox" checked={isSelected} onChange={checkboxClick} />
        {isSelected ? 'Cancel the selection' : 'Select item'}
      </div>
    </li>
  );
}

export default Card;

function checkboxClick() {}
