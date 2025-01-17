import { NavLink } from 'react-router-dom';
import { Path } from '../../utils/constants';
import styles from './SignUp.module.scss';
import { useAuth } from 'react-oidc-context';

export const SignUp = () => {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>
      </div>
    );
  }

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

          <div className={styles['sign-up__footer']}>
            <button
              className={styles['sign-up__button']}
              onClick={() => auth.signinRedirect()}
            >
              Sign Up
            </button>
            <div className={styles['sign-up__link-container']}>
              <NavLink to={Path.LogIn} className={styles['sign-up__acc-link']}>
                I already have an account
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
