import React from 'react';
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
  const isLogIn = pathname === Path.LogIn;
  const isAbout = pathname === Path.About;

  const getActiveLink = ({ isActive }: { isActive: boolean }) =>
    cn(
      styles.navbar__item,
      { [styles['navbar__item--active']]: isActive },
      { [styles['navbar__item--home']]: isHome },
      { [styles['navbar__item--homeAi']]: isHomeAI },
      { [styles['navbar__item--response']]: isResponse },
      { [styles['navbar__item--about']]: isAbout },
      { [styles['navbar__item--sign']]: isSignUp },
      { [styles['navbar__item--sign--active']]: isSignUp && isActive },
      { [styles['navbar__item--login']]: isLogIn },
      { [styles['navbar__item--login--active']]: isLogIn && isActive },
      className,
    );

  return (
    <section className={styles.navbar}>
      <div className={styles.navbar__left}></div>

      <div className={styles.navbar__right}>
        <button
          className={cn(styles.navbar__lang, {
            [styles['navbar__lang--home']]: isHome,
            [styles['navbar__lang--homeAi']]: isHomeAI,
            [styles['navbar__lang--response']]: isResponse,
            [styles['navbar__lang--about']]: isAbout,
            [styles['navbar__lang--sign']]: isSignUp,
            [styles['navbar__lang--login']]: isLogIn,
          })}
        >
          <span className={styles['navbar__lang-name']}>ENG</span>
        </button>
        {isLogIn ? (
          <NavLink to={Path.LogIn} className={getActiveLink}>
            <img
              src={isHome || isAbout ? user_white : user_black}
              alt="user"
              className={cn(styles.navbar__img, {
                [styles['navbar__img--dark']]:
                  isHomeAI || isResponse || isSignUp || isLogIn,
              })}
            />
            <span className={styles.navbar__name}>Log In</span>
          </NavLink>
        ) : (
          <NavLink to={Path.SignUp} className={getActiveLink}>
            <img
              src={isHome || isAbout ? user_white : user_black}
              alt="user"
              className={cn(styles.navbar__img, {
                [styles['navbar__img--dark']]:
                  isHomeAI || isResponse || isSignUp || isLogIn,
              })}
            />
            <span className={styles.navbar__name}>Sign Up</span>
          </NavLink>
        )}
      </div>
    </section>
  );
};
