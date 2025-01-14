import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Path } from '../../utils/constants';
import styles from './SignUp.module.scss';
import eye from '../../images/icons/eye.svg';
import open_eye from '../../images/icons/white-eye-icon-4.jpg';
import apple from '../../images/icons/apple.svg';
import google from '../../images/icons/google.svg';
import cognito from '../cognito';

export const SignUp = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationRequired, setIsVerificationRequired] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const params = {
      ClientId: '7f4n0jvd5vp0g8ji7p6ppe4gke',
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
      ],
    };

    try {
      await cognito.signUp(params).promise();
      setSuccessMessage('Sign-up successful!');
      setIsVerificationRequired(true);
    } catch (error) {
      setErrorMessage('An error occurred during sign-up.');
    }
  };

  const handleVerifyCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const params = {
      ClientId: '7f4n0jvd5vp0g8ji7p6ppe4gke',
      Username: email!,
      ConfirmationCode: verificationCode,
    };

    try {
      await cognito.confirmSignUp(params).promise();

      const authParams = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: '7f4n0jvd5vp0g8ji7p6ppe4gke',
        AuthParameters: {
          USERNAME: email!,
          PASSWORD: password,
        },
      };

      const authResponse = await cognito.initiateAuth(authParams).promise();

      if (authResponse.AuthenticationResult) {
        const idToken = authResponse.AuthenticationResult.IdToken ?? '';
        const accessToken = authResponse.AuthenticationResult.AccessToken ?? '';

        const tokensData = {
          idToken,
          accessToken,
        };

        if (rememberMe) {
          localStorage.setItem('idToken', idToken);
          localStorage.setItem('accessToken', accessToken);
        } else {
          sessionStorage.setItem('idToken', idToken);
          sessionStorage.setItem('accessToken', accessToken);
        }

        const response = await fetch(
          // eslint-disable-next-line max-len
          'https://dewvdtfd5m.execute-api.eu-north-1.amazonaws.com/dev/account',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(tokensData),
          },
        );

        if (!response.ok) {
          new Error('Network response was not ok');
        }

        const data = await response.json();

        // eslint-disable-next-line no-console
        console.log(data);

        setSuccessMessage('Account successfully verified and logged in!');
      } else {
        setErrorMessage('Authentication failed. Please try again.');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setErrorMessage('An error occurred during verification.');
    }
  };

  const showForm = () => {
    setIsFormVisible(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            <form className={styles['sign-up__form']} onSubmit={handleSignUp}>
              <input
                type="email"
                className={styles['sign-up__input']}
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <div className={styles['sign-up__line']}></div>
              <div className={styles['sign-up__input-shell']}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={styles['sign-up__input']}
                  placeholder="Create password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <img
                  src={showPassword ? open_eye : eye}
                  alt="eye"
                  onClick={togglePasswordVisibility}
                  className={styles['sign-up__img-eye']}
                />
              </div>
              <div className={styles['sign-up__line']}></div>
              <div className={styles['sign-up__check-shell']}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className={styles['sign-up__input-check']}
                />
                <span className={styles['sign-up__check-text']}>
                  Remember me
                </span>
              </div>
              <div className={styles['sign-up__button-shell']}>
                <button className={styles['sign-up__button-sign']}>
                  <span>Sign Up</span>
                </button>
              </div>
              {errorMessage && (
                <p className={styles['sign-up__error']}>{errorMessage}</p>
              )}
              {successMessage && (
                <p className={styles['sign-up__success']}>{successMessage}</p>
              )}
            </form>
            {isVerificationRequired && (
              <form onSubmit={handleVerifyCode}>
                <input
                  type="text"
                  className={styles['sign-up__input']}
                  placeholder="Enter verification code"
                  value={verificationCode}
                  onChange={e => setVerificationCode(e.target.value)}
                  required
                />
                <button type="submit" className={styles['sign-up__button']}>
                  Verify Code
                </button>
              </form>
            )}
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
              <form className={styles['sign-up__form']} onSubmit={handleSignUp}>
                <input
                  type="email"
                  className={styles['sign-up__input']}
                  placeholder="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <div className={styles['sign-up__line']}></div>
                <div className={styles['sign-up__input-shell']}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={styles['sign-up__input']}
                    placeholder="Create password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <img
                    src={showPassword ? open_eye : eye}
                    alt="eye"
                    onClick={togglePasswordVisibility}
                    className={styles['sign-up__img-eye']}
                  />
                </div>
                <div className={styles['sign-up__line']}></div>
                <div className={styles['sign-up__check-shell']}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
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
