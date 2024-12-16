import styles from './Response.module.scss';

export const Response = () => {
  const storedResponse = localStorage.getItem('response');
  const response = storedResponse ? JSON.parse(storedResponse) : null;

  return (
    <div className={styles.response}>
      <div className={styles.response__content}>
        {response ? (
          <pre>{JSON.stringify(response, null, 2)}</pre>
        ) : (
          <p>No response available</p>
        )}
      </div>
    </div>
  );
};
