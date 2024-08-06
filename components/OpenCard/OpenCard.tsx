'use client';

import { useMemo } from 'react';
import { requestObj } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteItem, setItem } from '../../redux/slices/selectedItems';
import styles from './OpenCard.module.scss';
import { Link } from '@remix-run/react';

type OpenCardType = {
  openCard: requestObj;
  page: string;
  id: string;
  search: string;
};

function OpenCard({ openCard, page, id, search }: OpenCardType) {
  const dispatch = useAppDispatch();
  const { selectedList } = useAppSelector((state) => state.selectedItems);
  const isSelected = useMemo(
    () => Boolean(selectedList.find((el) => el.id === id)),
    [selectedList, id],
  );

  function checkHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    if (isSelected) {
      dispatch(deleteItem(id));
    } else {
      if (openCard) {
        dispatch(
          setItem({
            id: id,
            url: openCard.url,
            name: openCard.name,
          }),
        );
      }
    }
  }

  return (
    <>
      {openCard && (
        <div className={styles.card}>
          <Link
            className={styles.btn}
            to={`/page/${page}${search ? `?search=${search}` : ''}`}
          >
            ✕
          </Link>
          <h2 className={styles.header}>{openCard.name}</h2>
          <div>
            <span className={styles.desc}>Gender: </span>
            <span>{openCard.gender}</span>
          </div>
          <div>
            <span className={styles.desc}>Birthday: </span>
            <span>{openCard.birth_year}</span>
          </div>
          <div>
            <span className={styles.desc}>Created: </span>
            <span>{new Date(openCard.created).toLocaleString()}</span>
          </div>
          <div>
            <span className={styles.desc}>Edited: </span>
            <span>{new Date(openCard.edited).toLocaleString()}</span>
          </div>
          <div>
            <span className={styles.desc}>Height: </span>
            <span>{openCard.height}</span>
          </div>
          <div>
            <span className={styles.desc}>Weight: </span>
            <span>{openCard.mass}</span>
          </div>
          <div>
            <span className={styles.desc}>Color skin: </span>
            <span>{openCard.skin_color}</span>
          </div>
          <div>
            <span className={styles.desc}>Color hair: </span>
            <span>{openCard.hair_color}</span>
          </div>
          <div>
            <span className={styles.desc}>Color eye: </span>
            <span>{openCard.eye_color}</span>
          </div>
          <div className={styles.checkbox} onClick={checkHandler}>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={checkboxClick}
            />
            {isSelected ? 'Cancel the selection' : 'Select item'}
          </div>
        </div>
      )}
    </>
  );
}

export default OpenCard;

function checkboxClick() {}
