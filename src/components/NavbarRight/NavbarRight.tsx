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

export const NavbarRight: React.FC<Props> = ({ className }) => {
  const { pathname } = useLocation();
  const isHome = pathname === Path.Home;
  const isHomeAI = pathname === Path.HomeAI;
  const isResponse = pathname === Path.Response;
  const isSignUp = pathname === Path.SignUp;
  const [userExists, setUserExists] = useState<boolean | null>(null);

  const getActiveLink = ({ isActive }: { isActive: boolean }) =>
    cn(
      styles.navbar__item,
      { [styles['navbar__item--active']]: isActive },
      { [styles['navbar__item--light-bg']]: isHome },
      { [styles['navbar__item--light-bg--active']]: isActive && isHome },
      { [styles['navbar__item--dark-bg']]: isHomeAI || isResponse || isSignUp },
      {
        [styles['navbar__item--dark-bg--active']]:
          (isActive && isHomeAI) ||
          (isActive && isResponse) ||
          (isActive && isSignUp),
      },
      className,
    );

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
            [styles['navbar__lang--light-bg']]: isHome || isResponse,
            [styles['navbar__lang--dark-bg']]: isHomeAI || isSignUp,
          })}
        >
          <span className={styles['navbar__lang-name']}>ENG</span>
        </button>
        <NavLink to={Path.SignUp} className={getActiveLink}>
          <img
            src={isHome ? user_white : user_black}
            alt="user"
            className={cn(styles.navbar__img, {
              [styles['navbar__img--dark']]: isHomeAI || isResponse || isSignUp,
            })}
          />
          <span
            className={cn(styles.navbar__name, {
              [styles['navbar__name--dark']]:
                isHomeAI || isResponse || isSignUp,
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
