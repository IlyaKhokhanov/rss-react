'use client';

import { useEffect, useMemo, useState } from 'react';
import { requestObj } from '../../types';
import Loader from '../Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteItem, setItem } from '../../redux/slices/selectedItems';
import { requestAPI } from '../../redux/requestService';
import { useRouter } from 'next/router';

function OpenCard() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedList } = useAppSelector((state) => state.selectedItems);
  const { currentElement, currentPage } = useAppSelector(
    (state) => state.application,
  );
  const [openCard, setOpenCard] = useState<requestObj | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isSelected = useMemo(
    () => Boolean(selectedList.find((el) => el.id === currentElement)),
    [selectedList, currentElement],
  );
  const queryItem = requestAPI.useFetchOneItemQuery(currentElement);

  useEffect(() => {
    setIsLoading(queryItem.isLoading || queryItem.isFetching);
    if (currentElement) {
      if (queryItem.data) setOpenCard(queryItem.data);
    }
  }, [
    currentElement,
    queryItem.data,
    queryItem.isFetching,
    queryItem.isLoading,
  ]);

  function checkHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    if (isSelected) {
      dispatch(deleteItem(currentElement));
    } else {
      if (openCard) {
        dispatch(
          setItem({
            id: currentElement,
            url: openCard.url,
            name: openCard.name,
          }),
        );
      }
    }
  }

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {openCard && (
        <div className="open-card">
          <button
            className="open-card-btn"
            onClick={() => {
              router.push({
                pathname: '/page/' + currentPage,
              });
            }}
          >
            ✕
          </button>
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
