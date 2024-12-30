import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import styles from './Faq.module.scss';
import { Path } from '../../utils/constants';
import down from '../../images/icons/down.svg';
import up from '../../images/icons/up.svg';
import { questions } from '../../helpers/questions';

export const Faq = () => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleClick = () => {
    setIsCollapsed(prev => !prev);
  };

  const toggleQuestion = (id: number) => {
    setOpenQuestionId(prevId => (prevId === id ? null : id));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.faq}>
      <div
        className={cn(styles['faq__content-top'], {
          [styles['faq__content-top--visible']]: isVisible,
          [styles['faq__content-top--collapsed']]: isCollapsed,
        })}
      >
        <h2
          className={cn(styles.faq__title, {
            [styles['faq__title--collapsed']]: isCollapsed,
          })}
        >
          Frequently Asked Questions
        </h2>
        <p
          className={cn(styles.faq__subtitle, {
            [styles['faq__subtitle--collapsed']]: isCollapsed,
          })}
        >
          Discover how The Change works and find answers to your questions.
          Whether you’re looking to volunteer, donate, post a wish, or
          collaborate with us, this section covers everything you need to know.
          Learn how we ensure trustworthiness, how to get involved, and how to
          make the most of our platform to support Ukraine and her people.
        </p>
        <div
          className={styles['faq__collaps-line']}
          onClick={handleClick}
        ></div>
        <div className={styles.faq__footer}>
          <h3 className={styles.faq__question}>What Would You Like To Know?</h3>
          <div className={styles.faq__buttons}>
            <Link
              to={Path.About}
              className={cn(styles.faq__button, {
                [styles['faq__button--active']]: pathname === Path.About,
              })}
            >
              <span>About Us</span>
            </Link>
            <Link
              to={Path.Faq}
              className={cn(styles.faq__button, {
                [styles['faq__button--active']]: pathname === Path.Faq,
              })}
            >
              <span>FAQ</span>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={cn(styles['faq__content-bottom'], {
          [styles['faq__content-bottom--collapsed']]: isCollapsed,
        })}
      >
        {questions.map(({ id, answer, question }) => (
          <React.Fragment key={id}>
            <div
              className={cn(styles.faq__block, {
                [styles['faq__block--open']]: openQuestionId === id,
              })}
              onClick={() => toggleQuestion(id)}
            >
              <div className={styles['faq__block-container']}>
                <p className={styles['faq__question-bottom']}>{question}</p>
                <button className={styles['faq__button-bottom']}>
                  <img
                    src={openQuestionId === id ? up : down}
                    alt="arrow"
                    className={styles.faq__img}
                  />
                </button>
              </div>
              <div className={styles.faq__line}></div>
              <div
                className={cn(styles.faq__answer, {
                  [styles['faq__answer--open']]: openQuestionId === id,
                })}
              >
                <p className={styles['faq__answer-text']}>{answer}</p>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
