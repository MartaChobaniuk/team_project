import { useState } from 'react';
import styles from './LogIn.module.scss';
import { NavLink } from 'react-router-dom';
import { Path } from '../../utils/constants';
import eye from '../../images/icons/eye.svg';
import apple from '../../images/icons/apple.svg';
import google from '../../images/icons/google.svg';

export const LogIn = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const showForm = () => {
    setIsFormVisible(true);
  };

  return (
    <div className={styles['log-in']}>
      <section className={styles['log-in__nav']}>
        <div className={styles['log-in__right-side']}>
          <div className={styles['log-in__empty']}></div>
          <div className={styles['log-in__footer-right']}>
            <div className={styles['log-in__contact-us']}>
              <p className={styles['log-in__subtitle']}>Contact Us</p>
              <p className={styles['log-in__part']}>
                <a
                  href="mailto:contact@thechange.ua"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['log-in__link']}
                >
                  contact@thechange.ua
                </a>
              </p>
              <p className={styles['log-in__part']}>
                <a
                  href="tel:+380681234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['log-in__link']}
                >
                  +38 (068) 123 4567
                </a>
              </p>
            </div>

            <div className={styles['log-in__visit-us']}>
              <p className={styles['log-in__subtitle']}>Visit Us</p>
              <p className={styles['log-in__part']}>
                <a
                  /* eslint-disable max-len */
                  href="https://www.google.com/maps/search/?api=1&query=Kniaziv+Ostrozkykh+St+8,+Kyiv,+Ukraine,+01029"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['log-in__link']}
                >
                  Kniaziv Ostrozkykh St 8,
                  <br />
                  Kyiv, Ukraine, 01029
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className={styles['log-in__left-side']}>
          <div className={styles['log-in__collaps-line']}></div>
          <div className={styles['log-in__content']}>
            <h2 className={styles['log-in__title']}>Log In</h2>
            <p className={styles['log-in__text']}>
              Log into your profile to easily apply for volunteering events,
              join fundraisers, and fulfill wishes. Keep track of your
              volunteering journey with our account dashboard, or submit your
              own wishes, fundraisers and events via a convenient application
              form.
            </p>
          </div>
          {!isFormVisible && (
            <button
              className={styles['log-in__button-footer']}
              onClick={showForm}
            >
              <span>Log In</span>
            </button>
          )}
          <div className={styles['log-in__footer']}>
            <form className={styles['log-in__form']}>
              <input
                type="email"
                className={styles['log-in__input']}
                placeholder="Email address"
              />
              <div className={styles['log-in__line']}></div>
              <div className={styles['log-in__input-shell']}>
                <input
                  type="password"
                  className={styles['log-in__input']}
                  placeholder="Create password"
                />
                <img src={eye} alt="eye" />
              </div>
              <div className={styles['log-in__line']}></div>
              <div className={styles['log-in__check-shell']}>
                <input
                  type="checkbox"
                  className={styles['log-in__input-check']}
                />
                <span className={styles['log-in__check-text']}>
                  Remember me
                </span>
              </div>
              <div className={styles['log-in__button-shell']}>
                <button className={styles['log-in__button-sign']} type="submit">
                  <span>Log In</span>
                </button>
              </div>
            </form>
            <div className={styles['log-in__accounts-shell']}>
              <p className={styles['log-in__text']}>
                Not a fan of an old-school method? No problem, we’ve got you:
              </p>
              <div className={styles['log-in__acc-button-shell']}>
                <button className={styles['log-in__button']} type="submit">
                  <img
                    src={google}
                    alt="google"
                    className={styles['log-in__img']}
                  />
                  <span>Google</span>
                </button>
                <button className={styles['log-in__button']} type="submit">
                  <img
                    src={apple}
                    alt="apple"
                    className={styles['log-in__img']}
                  />
                  <span>Apple</span>
                </button>
              </div>
            </div>
            <div className={styles['log-in__link-container']}>
              <NavLink to={Path.SignUp} className={styles['log-in__acc-link']}>
                Don&apos;t have an account yet? Sign Up here!
              </NavLink>
            </div>
          </div>
          {isFormVisible && (
            <div className={styles['log-in__tablets-footer']}>
              <form className={styles['log-in__form']}>
                <input
                  type="email"
                  className={styles['log-in__input']}
                  placeholder="Email address"
                />
                <div className={styles['log-in__line']}></div>
                <div className={styles['log-in__input-shell']}>
                  <input
                    type="password"
                    className={styles['log-in__input']}
                    placeholder="Create password"
                  />
                  <img src={eye} alt="eye" />
                </div>
                <div className={styles['log-in__line']}></div>
                <div className={styles['log-in__check-shell']}>
                  <input
                    type="checkbox"
                    className={styles['log-in__input-check']}
                  />
                  <span className={styles['log-in__check-text']}>
                    Remember me
                  </span>
                </div>
                <div className={styles['log-in__button-shell']}>
                  <button
                    className={styles['log-in__button-sign']}
                    type="submit"
                  >
                    <span>Log In</span>
                  </button>
                </div>
              </form>
              <div className={styles['log-in__accounts-shell']}>
                <p className={styles['log-in__text']}>
                  Not a fan of an old-school method? No problem, we’ve got you:
                </p>
                <div className={styles['log-in__acc-button-shell']}>
                  <button className={styles['log-in__button']} type="submit">
                    <img
                      src={google}
                      alt="google"
                      className={styles['log-in__img']}
                    />
                    <span>Google</span>
                  </button>
                  <button className={styles['log-in__button']} type="submit">
                    <img
                      src={apple}
                      alt="apple"
                      className={styles['log-in__img']}
                    />
                    <span>Apple</span>
                  </button>
                </div>
              </div>
              <div className={styles['log-in__link-container']}>
                <NavLink
                  to={Path.SignUp}
                  className={styles['log-in__acc-link']}
                >
                  Don&apos;t have an account yet? Sign Up here!
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
