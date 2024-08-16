import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setLastItem } from '../../redux/slices/application';
import List from '../List/List';
import styles from './MainPage.module.scss';

function MainPage() {
  const dispatch = useAppDispatch();
  const { refList, hookList, lastItem } = useAppSelector(
    (state) => state.application,
  );

  useEffect(() => {
    setTimeout(() => dispatch(setLastItem('')), 3000);
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.block}>
        <h2>Uncontrolled Form</h2>
        <List list={refList} last={lastItem === 'uncontrolled'} />
      </div>
      <div className={styles.block}>
        <h2>React Hook Form</h2>
        <List list={hookList} last={lastItem === 'hooklist'} />
      </div>
    </div>
  );
}

export default MainPage;
