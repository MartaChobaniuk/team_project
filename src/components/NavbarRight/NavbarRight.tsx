import React, { useState } from 'react';
import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './NavbarRight.module.scss';
import { Path } from '../../utils/constants';
import user_white from '../../images/icons/account_white.svg';
import user_black from '../../images/icons/account_black.svg';

type Props = {
  className?: string;
};

export const NavbarRight: React.FC<Props> = () => {
  const { pathname } = useLocation();
  const isHomeAI = pathname === Path.HomeAI;
  const isResponse = pathname === Path.Response;
  const isSignUp = pathname === Path.SignUp;
  const [userExists, setUserExists] = useState<boolean | null>(null);

  const checkUserExists = async () => {
    try {
      const response = await fetch(`/api/users/check?username=`);
      // eslint-disable-next-line @typescript-eslint/no-throw-literal

      if (!response.ok) {
        new Error('Failed to fetch user data');
      }

      const data = await response.json();

      setUserExists(data.exists); // Оновлюємо стан залежно від результату
    } catch (error) {
      setUserExists(false); // У разі помилки припускаємо, що користувач не існує
    }
  };

  checkUserExists();

  return (
    <section className={styles.navbar}>
      <div className={styles.navbar__left}></div>

      <div className={styles.navbar__right}>
        <button
          className={cn(styles.navbar__lang, {
            [styles['navbar__lang--light']]: isHomeAI,
            [styles['navbar__lang--resp']]: isResponse,
            [styles['navbar__lang--sign']]: isSignUp,
          })}
        >
          <span
            className={cn(styles['navbar__lang-name'], {
              [styles['navbar__lang-name--light']]: isHomeAI,
              [styles['navbar__lang-name--resp']]: isResponse,
              [styles['navbar__lang-name--sign']]: isSignUp,
            })}
          >
            ENG
          </span>
        </button>
        <NavLink
          to={Path.SignUp}
          className={({ isActive }: { isActive: boolean }) =>
            cn(styles.navbar__sign, {
              [styles['navbar__sign--light']]: isHomeAI,
              [styles['navbar__sign--active']]: isActive,
            })
          }
          end
        >
          <img
            src={isHomeAI ? user_black : user_white}
            alt="user"
            className={cn(styles.navbar__img, {
              [styles['navbar__img--light']]: isHomeAI,
            })}
          />
          <span
            className={cn(styles.navbar__name, {
              [styles['navbar__name--light']]: isHomeAI,
            })}
          >
            {userExists && 'Log In'}
            {!userExists && 'Sign Up'}
            {false && 'Profile'}
          </span>
        </NavLink>
      </div>
    </section>
  );
};
