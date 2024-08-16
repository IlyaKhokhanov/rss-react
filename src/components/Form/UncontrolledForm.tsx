import styles from './Form.module.scss';

function UncontrolledForm() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Uncontrolled Form</h1>
      <form className={styles.form}>
        <input className={styles.input} type="text" placeholder="Name" />
      </form>
    </div>
  );
}

export default UncontrolledForm;
