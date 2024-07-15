import Card from '../Card/Card';
import { IState } from '../../types';
import './List.scss';

type ListProps = {
  data: IState;
  setCurrentElement: (url: string) => void;
};

function List({ data, setCurrentElement }: ListProps) {
  return (
    <>
      {data.list.length ? (
        <ul className="list">
          {data.list.map((el, indx) => (
            <Card
              key={indx}
              card={el}
              currentElement={data.currentElement}
              setCurrentElement={setCurrentElement}
            />
          ))}
        </ul>
      ) : (
        <div className="list-empty">List is empty</div>
      )}
    </>
  );
}

export default List;
