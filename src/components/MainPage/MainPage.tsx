import { useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import styles from './MainPage.module.scss';

function MainPage() {
  // const { refList, hookList, lastItem } = useAppSelector(
  //   (state) => state.application,
  // );

  useEffect(()=> {setTimeout(() => {

  }, 3000);},[])

  return (
    <div className={styles.main}>
      <div className={styles.block}>
        <h2>Uncontrolled Form</h2>

      </div>
      <div className={styles.block}>
        <h2>React Hook Form</h2>
      </div>
    </div>
  );
}

export default MainPage;
