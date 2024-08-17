import { FieldError, Merge } from 'react-hook-form';
import styles from './Error.module.scss';

interface ErrorProps {
  error: FieldError | Merge<FieldError, object> | undefined;
}
function Error({ error }: ErrorProps): JSX.Element {
  return error ? <p className={styles.message}>{error.message}</p> : <></>;
}

export default Error;
