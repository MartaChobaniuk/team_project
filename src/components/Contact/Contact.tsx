import { useState } from 'react';
import styles from './Contact.module.scss';
import cn from 'classnames';

export const Contact = () => {
  const [query, setQuery] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleClick = () => {
    setIsCollapsed(prev => !prev);
  };

  const showForm = () => {
    setIsFormVisible(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className={styles.contact}>
      <section className={styles.contact__nav}>
        <div className={styles['contact__right-side']}>
          <div className={styles.contact__empty}></div>
          <div
            className={cn(styles['contact__footer-right'], {
              [styles['contact__footer-right--visible']]: isFormVisible,
              [styles['contact__footer-right--collapsed']]: isCollapsed,
            })}
          >
            <div className={styles['contact__contact-us']}>
              <p className={styles.contact__subtitle}>Contact Us</p>
              <p className={styles.contact__part}>
                <a
                  href="mailto:contact@thechange.ua"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contact__link}
                >
                  contact@thechange.ua
                </a>
              </p>
              <p className={styles.contact__part}>
                <a
                  href="tel:+380681234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contact__link}
                >
                  +38 (068) 123 4567
                </a>
              </p>
            </div>

            <div className={styles['contact__visit-us']}>
              <p className={styles.contact__subtitle}>Visit Us</p>
              <p className={styles.contact__part}>
                <a
                  /* eslint-disable max-len */
                  href="https://www.google.com/maps/search/?api=1&query=Kniaziv+Ostrozkykh+St+8,+Kyiv,+Ukraine,+01029"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contact__link}
                >
                  Kniaziv Ostrozkykh St 8,
                  <br />
                  Kyiv, Ukraine, 01029
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className={styles['contact__left-side']}>
          <div
            className={styles['contact__collaps-line']}
            onClick={handleClick}
          ></div>
          <div className={styles.contact__content}>
            <h2
              className={cn(styles.contact__title, {
                [styles['contact__title--visible']]: isFormVisible,
              })}
            >
              Want To Submit A Wish, Organizing A Fundraiser Or A Volunteering
              Event? Maybe, You Want To Partner With Us?
            </h2>
            <p className={styles.contact__text}>
              Tell us about yourself and your submission, leave an email
              address, and we’ll contact you within 3 business days.
            </p>
          </div>
          <div className={styles.contact__footer}>
            <button
              className={cn(styles['contact__button-send'], {
                [styles['contact__button-send--visible']]: isFormVisible,
                [styles['contact__button-send--collapsed']]: isCollapsed,
              })}
              onClick={showForm}
            >
              <span>Send a message</span>
            </button>
            <form
              className={cn(styles.contact__form, {
                [styles['contact__form--visible']]: isFormVisible,
                [styles['contact__form--collapsed']]: isCollapsed,
              })}
            >
              <div className={styles['contact__input-shell']}>
                <input
                  type="text"
                  className={styles.contact__input}
                  placeholder="Your name"
                />
                <div className={styles.contact__line}></div>
                <input
                  type="email"
                  className={styles.contact__input}
                  placeholder="Email"
                />
                <div className={styles.contact__line}></div>
                <textarea
                  value={query}
                  onChange={handleChange}
                  className={styles.contact__input}
                  placeholder="Tell about your submission"
                  maxLength={600}
                  rows={4}
                />
                <div className={styles.contact__line}></div>
              </div>
              <div className={styles['contact__button-shell']}>
                <button className={styles.contact__button} type="submit">
                  <span>Send</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
