'use client';

import FlyoutElement from '../FlyoutElement/FlyoutElement';
import Search from '../Search/Search';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setError, setDarkTheme } from '../../redux/slices/application';
import { useEffect } from 'react';

function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const dispatch = useAppDispatch();
  const { currentElement, isDarkTheme, hasError } = useAppSelector(
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
        style={{ gridTemplateColumns: currentElement ? '1.5fr 1fr' : '1fr' }}
      >
        {children}
      </div>
      <FlyoutElement />
    </div>
  );
}

export default MainLayout;
