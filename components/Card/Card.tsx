import { requestObj } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useMemo } from 'react';
import {
  deleteItem,
  setItem,
  setOpenId,
} from '../../redux/slices/selectedItems';
import styles from './Card.module.scss';
import { Link } from '@remix-run/react';

type CardProps = {
  card: requestObj;
  page: string;
  search: string;
};

function Card({ card, page, search }: CardProps) {
  const dispatch = useAppDispatch();
  const { selectedList, openId } = useAppSelector(
    (state) => state.selectedItems,
  );

  const cardId = card.url.split('/')[card.url.split('/').length - 2];
  const isActive = useMemo(() => openId === cardId, [openId, cardId]);
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
    <li className={isActive ? styles.active : styles.item}>
      <Link
        to={`/page/${page}${!isActive ? '/details/' + cardId : ''}${search ? `?search=${search}` : ''}`}
        onClick={() => dispatch(setOpenId(isActive ? '' : cardId))}
      >
        <h3 className={styles.header}>{card.name}</h3>
        <div>
          <span className={styles.desc}>Height: </span>
          <span>{card.height}</span>
        </div>
        <div>
          <span className={styles.desc}>Weight: </span>
          <span>{card.mass}</span>
        </div>
        <div>
          <span className={styles.desc}>Color skin: </span>
          <span>{card.skin_color}</span>
        </div>
        <div>
          <span className={styles.desc}>Color hair: </span>
          <span>{card.hair_color}</span>
        </div>
      </Link>
      <div className={styles.checkbox} onClick={checkHandler}>
        <input type="checkbox" checked={isSelected} onChange={checkboxClick} />
        {isSelected ? 'Cancel the selection' : 'Select item'}
      </div>
    </li>
  );
}

export default Card;

function checkboxClick() {}
