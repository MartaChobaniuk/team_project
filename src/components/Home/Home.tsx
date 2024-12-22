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
        <div className={styles['home__left-side']}>
          <div className={styles['home__content-left']}>
            <h1 className={styles.home__title}>
              Take Action Today. Be The Change You Want To See In The World.
            </h1>
            <p className={styles.home__text}>
              Use our search filters to explore opportunities to fulfill wishes,
              donate to fundraisers, and volunteer in ways that align with your
              passions.Every small step contributes to making the world a better
              place.
            </p>
          </div>
          <div className={styles['home__footer-left']}>
            <h3 className={styles['home__question-left']}>
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
          <div className={styles['home__content-right']}></div>
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

        <motion.div
          className={cn(styles['home__left-mobile'], {
            [styles['home__left-mobile--collapsed']]: isCollapsed,
          })}
        >
          <div
            className={styles['home__collaps-line']}
            onClick={handleClick}
          ></div>
          <div className={styles['home__mobile-content-left']}>
            <h1
              className={cn(styles['home__mobile-title'], {
                [styles['home__mobile-title--collapsed']]: isCollapsed,
              })}
            >
              Take Action Today. Be The Change You Want To See In The World.
            </h1>
            <p
              className={cn(styles['home__mobile-text'], {
                [styles['home__mobile-text--collapsed']]: isCollapsed,
              })}
            >
              Use our search filters to explore opportunities to fulfill wishes,
              donate to fundraisers, and volunteer in ways that align with your
              passions.Every small step contributes to making the world a better
              place.
            </p>
          </div>
        </motion.div>
        <div
          className={cn(styles['home__right-mobile'], {
            [styles['home__right-mobile--collapsed']]: isCollapsed,
          })}
        >
          <div
            className={cn(styles['home__mobile-content-right'], {
              [styles['home__mobile-content-right--collapsed']]: isCollapsed,
            })}
          >
            <h3 className={styles['home__mobile-question-left']}>
              How Do You Want To Contribute Today?
            </h3>
            <div className={styles['home__mobile-buttons']}>
              <button className={styles['home__mobile-button']}>
                <span>Donate</span>
              </button>
              <button className={styles['home__mobile-button']}>
                <span>Volunteer</span>
              </button>
              <button className={styles['home__mobile-button']}>
                <span>Explore All</span>
              </button>
            </div>
          </div>
          <div
            className={cn(styles['home__mobile-footer-right'], {
              [styles['home__mobile-footer-right--collapsed']]: isCollapsed,
            })}
          >
            {!isCollapsed && (
              <h3 className={styles['home__mobile-question-left']}>
                How Do You Want To Contribute Today?
              </h3>
            )}
            {isCollapsed && (
              <>
                <h3 className={styles['home__mobile-question-right']}>
                  Tell Us How You’d Like to Help
                  <br />
                  And We’ll Find the Right Opportunity
                </h3>
                <button
                  className={styles['home__mobile-arrow-button']}
                  onClick={handleHomeAI}
                >
                  <img src={arrow} alt={arrow} className={styles.home__img} />
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
