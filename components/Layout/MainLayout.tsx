import FlyoutElement from '../FlyoutElement/FlyoutElement';
import Search from '../Search/Search';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setError, setDarkTheme } from '../../redux/slices/application';
import { useEffect } from 'react';
import { useParams, useSearchParams } from '@remix-run/react';
import styles from './MainLayout.module.scss';
import { setOpenId } from '../../redux/slices/selectedItems';

function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ page: string; id?: string }>();
  const search = useSearchParams();
  const { isDarkTheme, hasError } = useAppSelector(
    (state) => state.application,
  );

  useEffect(() => {
    if (id) dispatch(setOpenId(id));
  }, []);

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
      <Search
        currentId={id ? id : null}
        search={search[0].get('search') || ''}
      />
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
