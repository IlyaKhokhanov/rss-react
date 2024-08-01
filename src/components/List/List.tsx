import { requestObj } from '../../types';
import Card from '../Card/Card';
import styles from './List.module.scss';

type ListType = {
  list: requestObj[] | null;
  openId: string;
  page: string;
  search: string;
};

function List({ list, openId, page, search }: ListType) {
  return (
    <>
      {list && list.length ? (
        <ul className={styles.list}>
          {list.map((el, indx) => (
            <Card
              key={indx}
              card={el}
              openId={openId}
              page={page}
              search={search}
            />
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>List is empty</div>
      )}
    </>
  );
}

export default List;
