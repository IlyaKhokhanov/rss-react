import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import { store } from '../redux/store';
import '../index.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Error from '../components/Error/Error';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ErrorBoundary>
  );
}
