import cn from 'classnames';
import styles from './AboutUs.module.scss';
import { useState } from 'react';

export const AboutUs = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleClick = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <div className={styles.about}>
      <section className={styles.about__nav}>
        <div className={styles['about__left-side']}>
          <div className={styles['about__content-left']}>
            <h1 className={styles.about__title}>
              At The Change, We Believe In Action Over Words.
            </h1>
            <p className={styles.about__text}>
              Our platform connects people from all walks of life with
              meaningful opportunities to make a difference in Ukraine. Whether
              you’re fulfilling heartfelt wishes, donating to crucial
              fundraisers, or volunteering your time and skills, The Change
              makes it easy to find and contribute to causes that resonate with
              you.
              <br />
              With a user-friendly catalog and advanced search tools—including
              filters and AI-driven recommendations—you can quickly discover the
              perfect way to support those in need. Our platform also offers
              online options for those unable to be on the ground in Ukraine,
              ensuring everyone, whether at home or abroad, can contribute.
              <br />
              The name The Change reflects both our mission and our mindset: we
              inspire proactive help rather than passive hope. By facilitating
              direct impact, we aim to empower Ukrainians and benefactors
              worldwide to shape a better future—one act of generosity at a
              time.
            </p>
            <div
              className={styles['sign-up__collaps-line']}
              onClick={handleClick}
            ></div>
          </div>
          <div className={styles['about__footer-left']}>
            <h3 className={styles['about__question-left']}>
              What Would You Like To Know?
            </h3>
            <div className={styles.about__buttons}>
              <button className={styles.about__button}>
                <span>About Us</span>
              </button>
              <button className={styles.about__button}>
                <span>FAQ</span>
              </button>
            </div>
          </div>
        </div>
        <div className={styles['about__right-side']}>
          <div
            className={cn(styles['about__right-side'], {
              [styles['about__right-side--collapsed']]: isCollapsed,
            })}
          >
            <div className={styles.about__empty}></div>
            <div className={styles['about__footer-right']}>
              <div className={styles['about__contact-us']}>
                <p className={styles.about__subtitle}>Contact Us</p>
                <p className={styles.about__part}>
                  <a
                    href="mailto:contact@thechange.ua"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.about__link}
                  >
                    contact@thechange.ua
                  </a>
                </p>
                <p className={styles.about__part}>
                  <a
                    href="tel:+380681234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.about__link}
                  >
                    +38 (068) 123 4567
                  </a>
                </p>
              </div>
              <div className={styles['about__visit-us']}>
                <p className={styles.about__subtitle}>Visit Us</p>
                <p className={styles.about__part}>
                  <a
                    /* eslint-disable max-len */
                    href="https://www.google.com/maps/search/?api=1&query=Kniaziv+Ostrozkykh+St+8,+Kyiv,+Ukraine,+01029"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.about__link}
                  >
                    Kniaziv Ostrozkykh St 8,
                    <br />
                    Kyiv, Ukraine, 01029
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
