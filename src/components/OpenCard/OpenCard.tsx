import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { request } from '../../api';
import { requestObj } from '../../types';
import Loader from '../Loader/Loader';
import './OpenCard.scss';

const URL = 'https://swapi.dev/api/people/';

function OpenCard() {
  const [openCard, setOpenCard] = useState<requestObj | null>(null);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function requestCard() {
      setOpenCard(null);
      request<requestObj>(URL + pathname.split('/')[4])
        .then((data) => {
          if (typeof data !== 'string') {
            setOpenCard(data);
          }
        })
        .catch((err) => console.error(err));
    }
    if (pathname.split('/')[4]) {
      requestCard();
    }
  }, [pathname]);

  if (!openCard) {
    return <Loader />;
  }

  return (
    <div className="open-card">
      <button
        className="open-card-btn"
        onClick={() => navigate(pathname.split('/').slice(0, 3).join('/'))}
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
    </div>
  );
}

export default OpenCard;
