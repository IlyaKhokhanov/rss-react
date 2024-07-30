import { requestObj } from '../../types';
import Card from '../Card/Card';

function List({ list, openId }: { list: requestObj[] | null; openId: string }) {
  return (
    <>
      {list && list.length ? (
        <ul className="list">
          {list.map((el, indx) => (
            <Card key={indx} card={el} openId={openId} />
          ))}
        </ul>
      ) : (
        <div className="empty">List is empty</div>
      )}
    </>
  );
}

export default List;
