'use client';

import { requestObj } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useMemo } from 'react';
import { deleteItem, setItem } from '../../redux/slices/selectedItems';
import { useRouter } from 'next/navigation';
import styles from './Card.module.scss';

type CardProps = {
  card: requestObj;
  openId: string;
  page: string;
  search: string;
};

function Card({ card, openId, page, search }: CardProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedList } = useAppSelector((state) => state.selectedItems);

  const cardId = card.url.split('/')[card.url.split('/').length - 2];
  const isActive = openId === cardId;
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

  function clickHandler() {
    router.push(
      `/page/${page}${!isActive ? '/details/' + cardId : ''}${search ? `?search=${search}` : ''}`,
    );
  }

  return (
    <li
      className={isActive ? styles.active : styles.item}
      onClick={clickHandler}
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
      <div className={styles.checkbox} onClick={checkHandler}>
        <input type="checkbox" checked={isSelected} onChange={checkboxClick} />
        {isSelected ? 'Cancel the selection' : 'Select item'}
      </div>
    </li>
  );
}

export default Card;

function checkboxClick() {}
