import { Item } from '../../utils/types';
import styles from './List.module.scss';

function List({ list, last }: { list: Item[]; last: boolean }) {
  const activeEl = last ? list.length - 1 : null;

  return (
    <ul className={styles.list}>
      {list.map((el, indx) => (
        <li
          className={`${styles.item} ${activeEl === indx ? styles.active : ''}`}
        >
          <img className={styles.picture} src={el.picture} />
          <h2>Name: {el.name}</h2>
          <h2>Email: {el.email}</h2>
          <h2>Gender: {el.gender}</h2>
          <h2>Age: {el.age}</h2>
          <h2>Country: {el.country}</h2>
          <h2>Password: {el.password}</h2>
        </li>
      ))}
    </ul>
  );
}

export default List;
