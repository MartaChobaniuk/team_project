import styles from './Home.module.scss';
import arrow from '../../images/icons/arrow_r.svg';
import React from 'react';

type Props = {
  handleHomeAI: () => void;
};

export const Home: React.FC<Props> = ({ handleHomeAI }) => {
  return (
    <div className={styles.home}>
      <section className={styles.home__nav}>
        <div className={styles['home__left-side']}>
          <div className={styles.home__content}>
            <h1 className={styles.home__title}>
              Take Action Today. <br />
              Be The Change <br />
              You Want To See <br />
              In The World.
            </h1>
            <p className={styles.home__text}>
              Use our search filters to explore opportunities to fulfill wishes,
              donate to fundraisers, and volunteer in ways that align with your
              passions. Every small step contributes to making the world a
              better place.
            </p>
          </div>
          <div className={styles.home__footer}>
            <h3 className={styles.home__question}>
              How Do You Want To Contribute Today?
            </h3>
            <div className={styles.home__buttons}>
              <button className={styles.home__button}>
                <span>Donate</span>
              </button>
              <button className={styles.home__button}>
                <span>Volunteer</span>
              </button>
              <button className={styles.home__button}>
                <span>Explore All</span>
              </button>
            </div>
          </div>
        </div>
        <div className={styles['home__right-side']}>
          <div className={styles.home__empty}></div>
          <div className={styles['home__footer-right']}>
            <h3 className={styles['home__question-right']}>
              Tell Us How You’d Like to Help
              <br />
              And We’ll Find the Right Opportunity
            </h3>
            <button
              className={styles['home__arrow-button']}
              onClick={handleHomeAI}
            >
              <img src={arrow} alt={arrow} className={styles.home__img} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
