import { useNavigate } from 'react-router-dom';
import styles from './StepThree.module.scss';
import arrow from '../../images/icons/arrow_back.svg';
import { Path } from '../../utils/constants';

export const StepThree = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.three}>
      <div className={styles.three__nav}>
        <div className={styles['three__right-side']}>
          <div
            className={styles['three__bllock-top']}
            onClick={() => navigate(Path.StepTwo)}
          >
            <img src={arrow} alt="arrow" className={styles.three__img} />
            <p className={styles.three__back}>Go Back</p>
          </div>
          <div className={styles['three__bllock-bottom']}>
            <h1 className={styles.three__title}>New Opportunity</h1>
            <h3 className={styles.three__subtitle}>
              Step 3/3. Upload Files & Documents
            </h3>
          </div>
        </div>
        <div className={styles['three__left-side']}>
          <p className={styles.three__content}>
            Upload a description (file or link to Google Docs), supporting
            documents (like permits or plans), and a cover image to attract
            attention. These extras help users understand the impact of your
            opportunity and how they can get involved.
          </p>
          <div className={styles.three__form}>
            <form action="">
              <div className={styles.three__buttons}>
                <button
                  className={styles['three__button-prev']}
                  onClick={() => navigate(Path.StepTwo)}
                >
                  Previous Step
                </button>
                <button className={styles['three__button-submit']}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
