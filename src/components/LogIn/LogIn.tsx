/* eslint-disable no-console */
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import styles from './LogIn.module.scss';
import { Loader } from '../Loader';

export const LogIn = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const url = new URL(window.location.href);

    if (url.searchParams.has('code') || url.searchParams.has('state')) {
      url.searchParams.delete('code');
      url.searchParams.delete('state');

      navigate(url.pathname + url.hash, { replace: true });
    }
  }, [navigate, location]);

  if (auth.isLoading) {
    return <Loader />;
  }

  if (auth.error) {
    return (
      <div className={styles.error}>
        Encountering error... {auth.error.message}
      </div>
    );
  }

  if (auth.isAuthenticated) {
    const idToken = auth.user?.id_token;
    const accessToken = auth.user?.access_token;

    if (!idToken || !accessToken) {
      return <div>Error: Tokens not found</div>;
    }

    localStorage.setItem('idToken', idToken);
    localStorage.setItem('accessToken', accessToken);

    fetch(
      'https://dewvdtfd5m.execute-api.eu-north-1.amazonaws.com/dev/account',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then(data => {
        console.log('Data from backend:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    return <div className={styles.message}>Welcome, you are logged in!</div>;
  }

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
          <div className={styles['log-in__footer']}>
            <button
              className={styles['log-in__button']}
              onClick={() => auth.signinRedirect()}
            >
              Log In
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
