'use client';

import FlyoutElement from '../FlyoutElement/FlyoutElement';
import Search from '../Search/Search';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setError, setDarkTheme } from '../../redux/slices/application';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id?: string }>();
  const { isDarkTheme, hasError } = useAppSelector(
    (state) => state.application,
  );

  useEffect(() => {
    function addError() {
      if (hasError) throw new Error('Error');
    }
    addError();
  }, [hasError]);

  return (
    <div className={`app ${isDarkTheme ? 'dark-theme' : ''}`}>
      <div className="buttons-wrapper">
        <button className="error-btn" onClick={() => dispatch(setError(true))}>
          Generate ERROR
        </button>
        <button
          className="theme-button"
          onClick={() => dispatch(setDarkTheme(!isDarkTheme))}
        >
          {isDarkTheme ? 'Turn on a light theme' : 'Turn on the dark theme'}
        </button>
      </div>
      <Search />
      <div
        className="main"
        style={{ gridTemplateColumns: id ? '1.5fr 1fr' : '1fr' }}
      >
        {children}
      </div>
      <FlyoutElement />
    </div>
  );
}

export default MainLayout;
