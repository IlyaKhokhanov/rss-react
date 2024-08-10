import { requestObj } from '../../types';
import Card from '../Card/Card';
import styles from './List.module.scss';

type ListType = {
  list: requestObj[] | null;
  page: string;
  search: string;
};

function List({ list,  page, search }: ListType) {
  return (
    <>
      {list && list.length ? (
        <ul className={styles.list}>
          {list.map((el, indx) => (
            <Card
              key={indx}
              card={el}
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
