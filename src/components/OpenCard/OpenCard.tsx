import { useEffect, useMemo, useState } from 'react';
import { request } from '../../api';
import { requestObj } from '../../types';
import Loader from '../Loader/Loader';
import './OpenCard.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentElement } from '../../redux/slices/application';
import { deleteItem, setItem } from '../../redux/slices/selectedItems';

const URL = 'https://swapi.dev/api/people/';

function OpenCard() {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.selectedItems);
  const { currentElement } = useAppSelector((state) => state.application);
  const [openCard, setOpenCard] = useState<requestObj | null>(null);
  const isSelected = useMemo(
    () => Boolean(list.find((el) => el.id === currentElement)),
    [list, currentElement],
  );

  useEffect(() => {
    async function requestCard() {
      setOpenCard(null);
      request<requestObj>(URL + currentElement)
        .then((data) => {
          if (typeof data !== 'string') {
            setOpenCard(data);
          }
        })
        .catch((err) => console.error(err));
    }
    if (currentElement) {
      requestCard();
    }
  }, [currentElement]);

  return (
    <>
      {openCard ? (
        <div className="open-card">
          <button
            className="open-card-btn"
            onClick={() => dispatch(setCurrentElement(''))}
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
          <div
            className="item-checkbox"
            onClick={(e) => {
              e.stopPropagation();
              if (isSelected) {
                dispatch(deleteItem(currentElement));
              } else {
                dispatch(
                  setItem({
                    id: currentElement,
                    url: openCard.url,
                    name: openCard.name,
                  }),
                );
              }
            }}
          >
            <input type="checkbox" checked={isSelected} />
            {isSelected ? 'Cancel the selection' : 'Select item'}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default OpenCard;
