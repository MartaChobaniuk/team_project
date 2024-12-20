import React, { useState } from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import styles from './Home.module.scss';
import arrow from '../../images/icons/arrow_r.svg';

type Props = {
  handleHomeAI: () => void;
};

export const Home: React.FC<Props> = ({ handleHomeAI }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleClick = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <div className={styles.home}>
      <section className={styles.home__nav}>
        <motion.div
          className={cn(styles['home__left-side'], {
            [styles['home__left-side--collapsed']]: isCollapsed,
          })}
          initial={{ y: 0 }}
          animate={{
            y: isCollapsed ? -210 : 0,
          }}
          transition={{
            y: { duration: 0.3, ease: 'easeInOut' },
          }}
        >
          <div
            className={styles['home__collaps-line']}
            onClick={handleClick}
          ></div>
          <div className={styles.home__content}>
            <h1
              className={cn(styles.home__title, {
                [styles['home__title--collapsed']]: isCollapsed,
              })}
            >
              Take Action Today. <br />
              Be The Change <br />
              You Want To See <br />
              In The World.
            </h1>
            <p
              className={cn(styles.home__text, {
                [styles['home__text--collapsed']]: isCollapsed,
              })}
            >
              Use our search filters to explore opportunities to fulfill wishes,
              donate to fundraisers, and volunteer in ways that align with your
              passions. <br /> Every small step contributes to making the world
              a better place.
            </p>
          </div>
          <div className={styles['home__footer-left']}>
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
        </motion.div>
        <div className={styles['home__right-side']}>
          <div className={styles.home__empty}></div>
          <div
            className={cn(styles.home__footer, {
              [styles['home__footer--collapsed']]: isCollapsed,
            })}
          >
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
