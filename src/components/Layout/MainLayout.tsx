'use client';

import FlyoutElement from '../FlyoutElement/FlyoutElement';
import Search from '../Search/Search';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setError, setDarkTheme } from '../../redux/slices/application';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from './MainLayout.module.scss';

function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const dispatch = useAppDispatch();
  const { page, id } = useParams<{ id?: string; page: string }>();
  const { isDarkTheme, hasError } = useAppSelector(
    (state) => state.application,
  );

  useEffect(() => {
    function addError() {
      if (hasError) throw new Error('Error');
    }
    addError();
  }, [hasError]);

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : '');
  }, [isDarkTheme]);

  return (
    <div className={styles.app}>
      <div className={styles.buttons}>
        <button
          className={styles.error}
          onClick={() => dispatch(setError(true))}
        >
          Generate ERROR
        </button>
        <button
          className={styles.theme}
          onClick={() => dispatch(setDarkTheme(!isDarkTheme))}
        >
          {isDarkTheme ? 'Turn on a light theme' : 'Turn on the dark theme'}
        </button>
      </div>
      <Search page={page} currentId={id ? id : null} />
      <div
        className={styles.main}
        style={{ gridTemplateColumns: id ? '1.5fr 1fr' : '1fr' }}
      >
        {children}
      </div>
      <FlyoutElement />
    </div>
  );
}

export default MainLayout;
