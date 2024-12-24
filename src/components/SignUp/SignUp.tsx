import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Path } from '../../utils/constants';
import styles from './SignUp.module.scss';
import eye from '../../images/icons/eye.svg';
import apple from '../../images/icons/apple.svg';
import google from '../../images/icons/google.svg';

export const SignUp = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const showForm = () => {
    setIsFormVisible(true);
  };

  return (
    <div className={styles['sign-up']}>
      <section className={styles['sign-up__nav']}>
        <div className={styles['sign-up__right-side']}>
          <div className={styles['sign-up__empty']}></div>
          <div className={styles['sign-up__footer-right']}>
            <div className={styles['sign-up__contact-us']}>
              <p className={styles['sign-up__subtitle']}>Contact Us</p>
              <p className={styles['sign-up__part']}>
                <a
                  href="mailto:contact@thechange.ua"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['sign-up__link']}
                >
                  contact@thechange.ua
                </a>
              </p>
              <p className={styles['sign-up__part']}>
                <a
                  href="tel:+380681234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['sign-up__link']}
                >
                  +38 (068) 123 4567
                </a>
              </p>
            </div>

            <div className={styles['sign-up__visit-us']}>
              <p className={styles['sign-up__subtitle']}>Visit Us</p>
              <p className={styles['sign-up__part']}>
                <a
                  /* eslint-disable max-len */
                  href="https://www.google.com/maps/search/?api=1&query=Kniaziv+Ostrozkykh+St+8,+Kyiv,+Ukraine,+01029"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['sign-up__link']}
                >
                  Kniaziv Ostrozkykh St 8,
                  <br />
                  Kyiv, Ukraine, 01029
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className={styles['sign-up__left-side']}>
          <div className={styles['sign-up__collaps-line']}></div>
          <div className={styles['sign-up__content']}>
            <h2 className={styles['sign-up__title']}>Sign Up</h2>
            <p className={styles['sign-up__text']}>
              Create a profile to easily apply for volunteering events, join
              fundraisers, and fulfill wishes. Keep track of your volunteering
              journey with our account dashboard, or submit your own wishes,
              fundraisers and events via a convenient application form.
            </p>
          </div>
          {!isFormVisible && (
            <button
              className={styles['sign-up__button-footer']}
              onClick={showForm}
            >
              <span>Sign Up</span>
            </button>
          )}
          <div className={styles['sign-up__footer']}>
            <form className={styles['sign-up__form']}>
              <input
                type="email"
                className={styles['sign-up__input']}
                placeholder="Email address"
              />
              <div className={styles['sign-up__line']}></div>
              <div className={styles['sign-up__input-shell']}>
                <input
                  type="password"
                  className={styles['sign-up__input']}
                  placeholder="Create password"
                />
                <img src={eye} alt="eye" />
              </div>
              <div className={styles['sign-up__line']}></div>
              <div className={styles['sign-up__check-shell']}>
                <input
                  type="checkbox"
                  className={styles['sign-up__input-check']}
                />
                <span className={styles['sign-up__check-text']}>
                  Remember me
                </span>
              </div>
              <div className={styles['sign-up__button-shell']}>
                <button
                  className={styles['sign-up__button-sign']}
                  type="submit"
                >
                  <span>Sign Up</span>
                </button>
              </div>
            </form>
            <div className={styles['sign-up__accounts-shell']}>
              <p className={styles['sign-up__text']}>
                Not a fan of an old-school method? No problem, we’ve got you:
              </p>
              <div className={styles['sign-up__acc-button-shell']}>
                <button className={styles['sign-up__button']} type="submit">
                  <img
                    src={google}
                    alt="google"
                    className={styles['sign-up__img']}
                  />
                  <span>Google</span>
                </button>
                <button className={styles['sign-up__button']} type="submit">
                  <img
                    src={apple}
                    alt="apple"
                    className={styles['sign-up__img']}
                  />
                  <span>Apple</span>
                </button>
              </div>
            </div>
            <div className={styles['sign-up__link-container']}>
              <NavLink to={Path.LogIn} className={styles['sign-up__acc-link']}>
                I already have an account
              </NavLink>
            </div>
          </div>

          {isFormVisible && (
            <div className={styles['sign-up__tablets-footer']}>
              <form className={styles['sign-up__form']}>
                <input
                  type="email"
                  className={styles['sign-up__input']}
                  placeholder="Email address"
                />
                <div className={styles['sign-up__line']}></div>
                <div className={styles['sign-up__input-shell']}>
                  <input
                    type="password"
                    className={styles['sign-up__input']}
                    placeholder="Create password"
                  />
                  <img src={eye} alt="eye" />
                </div>
                <div className={styles['sign-up__line']}></div>
                <div className={styles['sign-up__check-shell']}>
                  <input
                    type="checkbox"
                    className={styles['sign-up__input-check']}
                  />
                  <span className={styles['sign-up__check-text']}>
                    Remember me
                  </span>
                </div>
                <div className={styles['sign-up__button-shell']}>
                  <button
                    className={styles['sign-up__button-sign']}
                    type="submit"
                  >
                    <span>Sign Up</span>
                  </button>
                </div>
              </form>
              <div className={styles['sign-up__accounts-shell']}>
                <p className={styles['sign-up__text']}>
                  Not a fan of an old-school method? No problem, we’ve got you:
                </p>
                <div className={styles['sign-up__acc-button-shell']}>
                  <button className={styles['sign-up__button']} type="submit">
                    <img
                      src={google}
                      alt="google"
                      className={styles['sign-up__img']}
                    />
                    <span>Google</span>
                  </button>
                  <button className={styles['sign-up__button']} type="submit">
                    <img
                      src={apple}
                      alt="apple"
                      className={styles['sign-up__img']}
                    />
                    <span>Apple</span>
                  </button>
                </div>
              </div>
              <div className={styles['sign-up__link-container']}>
                <NavLink
                  to={Path.LogIn}
                  className={styles['sign-up__acc-link']}
                >
                  I already have an account
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
