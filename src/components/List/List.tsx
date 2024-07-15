import Card from '../Card/Card';
import './List.scss';
import { useAppSelector } from '../../hooks';

function List() {
  const { list } = useAppSelector((state) => state.application);

  return (
    <>
      {list && list.length ? (
        <ul className="list">
          {list.map((el, indx) => (
            <Card key={indx} card={el} />
          ))}
        </ul>
      ) : (
        <div className="list-empty">List is empty</div>
      )}
    </>
  );
}

export default List;
