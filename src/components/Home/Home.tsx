import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import styles from './Home.module.scss';
import arrow from '../../images/icons/arrow_r.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { Path } from '../../utils/constants';

export const Home: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isFixed, setIsFixed] = useState(false);
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setIsScrolled(scrollY > 50);
      setIsFixed(scrollY > 50);
    };

    const handleFixed = () => {
      if (contentRef.current) {
        const isAtBottom =
          contentRef.current.scrollHeight - contentRef.current.scrollTop <=
          contentRef.current.clientHeight + 1;

        setIsScrolled(contentRef.current.scrollTop > 0);
        setIsFixed(isAtBottom);
      }
    };

    contentRef.current?.addEventListener('scroll', handleFixed);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      contentRef.current?.removeEventListener('scroll', handleFixed);
    };
  }, []);

  const handleHomeAI = () => {
    navigate(Path.HomeAI);
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
              <NavLink to={Path.Donate} className={styles.home__button}>
                <span>Donate</span>
              </NavLink>
              <NavLink to={Path.Volunteering} className={styles.home__button}>
                <span>Volunteer</span>
              </NavLink>
              <NavLink to={Path.Explore} className={styles.home__button}>
                <span>Explore All</span>
              </NavLink>
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

        <div
          ref={contentRef}
          className={cn(styles['home__left-mobile'], {
            [styles['home__left-mobile--scrolled']]: isScrolled,
            [styles['home__left-mobile--fixed']]: isFixed,
          })}
        >
          <div className={styles['home__collaps-line']}></div>
          <div className={styles['home__mobile-content-left']}>
            <h1
              className={cn(styles['home__mobile-title'], {
                [styles['home__mobile-title--scrolled']]: isScrolled,
              })}
            >
              Take Action Today. Be The Change You Want To See In The World.
            </h1>
            <p
              className={cn(styles['home__mobile-text'], {
                [styles['home__mobile-text--scrolled']]: isScrolled,
              })}
            >
              Use our search filters to explore opportunities to fulfill wishes,
              donate to fundraisers, and volunteer in ways that align with your
              passions.Every small step contributes to making the world a better
              place.
            </p>
          </div>
        </div>
        <div
          className={cn(styles['home__right-mobile'], {
            [styles['home__right-mobile--scrolled']]: isScrolled,
          })}
        >
          <div
            className={cn(styles['home__mobile-content-right'], {
              [styles['home__mobile-content-right--scrolled']]: isScrolled,
            })}
          >
            <h3 className={styles['home__mobile-question-left']}>
              How Do You Want To Contribute Today?
            </h3>
            <div className={styles['home__mobile-buttons']}>
              <NavLink
                to={Path.Donate}
                className={styles['home__mobile-button']}
              >
                <span>Donate</span>
              </NavLink>
              <NavLink
                to={Path.Volunteering}
                className={styles['home__mobile-button']}
              >
                <span>Volunteer</span>
              </NavLink>
              <NavLink
                to={Path.Explore}
                className={styles['home__mobile-button']}
              >
                <span>Explore All</span>
              </NavLink>
            </div>
          </div>
          <div
            className={cn(styles['home__mobile-footer-right'], {
              [styles['home__mobile-footer-right--scrolled']]: isScrolled,
            })}
          >
            {!isScrolled && (
              <h3 className={styles['home__mobile-question-left']}>
                How Do You Want To Contribute Today?
              </h3>
            )}
            {isScrolled && (
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
