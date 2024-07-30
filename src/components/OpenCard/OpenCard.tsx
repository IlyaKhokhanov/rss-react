'use client';

import { useMemo } from 'react';
import { requestObj } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteItem, setItem } from '../../redux/slices/selectedItems';
import Link from 'next/link';

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
        <div className="open-card">
          <Link
            className="open-card-btn"
            href={`/page/${page}${search ? `?search=${search}` : ''}`}
          >
            ✕
          </Link>
          <h2 className="open-card-header">{openCard.name}</h2>
          <div>
            <span className="open-card-desc">Gender: </span>
            <span>{openCard.gender}</span>
          </div>
          <div>
            <span className="open-card-desc">Birthday: </span>
            <span>{openCard.birth_year}</span>
          </div>
          <div>
            <span className="open-card-desc">Created: </span>
            <span>{new Date(openCard.created).toLocaleString()}</span>
          </div>
          <div>
            <span className="open-card-desc">Edited: </span>
            <span>{new Date(openCard.edited).toLocaleString()}</span>
          </div>
          <div>
            <span className="open-card-desc">Height: </span>
            <span>{openCard.height}</span>
          </div>
          <div>
            <span className="open-card-desc">Weight: </span>
            <span>{openCard.mass}</span>
          </div>
          <div>
            <span className="open-card-desc">Color skin: </span>
            <span>{openCard.skin_color}</span>
          </div>
          <div>
            <span className="open-card-desc">Color hair: </span>
            <span>{openCard.hair_color}</span>
          </div>
          <div>
            <span className="open-card-desc">Color eye: </span>
            <span>{openCard.eye_color}</span>
          </div>
          <div className="item-checkbox" onClick={checkHandler}>
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
