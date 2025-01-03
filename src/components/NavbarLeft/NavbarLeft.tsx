import React from 'react';
import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './NavbarLeft.module.scss';
import { Path } from '../../utils/constants';

type Props = {
  className?: string;
};

export const NavbarLeft: React.FC<Props> = ({ className }) => {
  const { pathname } = useLocation();
  const isHome = pathname === Path.Home;
  const isHomeAI = pathname === Path.HomeAI;
  const isResponse = pathname === Path.Response;
  const isSignUp = pathname === Path.SignUp;
  const isLogIn = pathname === Path.LogIn;
  const isFaq = pathname === Path.Faq;
  const isAbout = pathname === Path.About || isFaq;

  const navLinks = [
    { path: Path.Stories, label: 'Success Stories' },
    { path: Path.About, label: 'About Us' },
    { path: Path.Contact, label: 'Contact' },
  ];

  const getActiveLink = ({ isActive }: { isActive: boolean }) =>
    cn(
      styles.navbar__item,
      { [styles['navbar__item--active']]: isActive },
      { [styles['navbar__item--home']]: isHome },
      { [styles['navbar__item--home--active']]: isHome && isActive },
      { [styles['navbar__item--homeAi']]: isHomeAI },
      { [styles['navbar__item--homeAi--active']]: isHomeAI && isActive },
      { [styles['navbar__item--response']]: isResponse },
      { [styles['navbar__item--response--active']]: isResponse && isActive },
      { [styles['navbar__item--sign']]: isSignUp },
      { [styles['navbar__item--login']]: isLogIn },
      { [styles['navbar__item--about']]: isAbout || isFaq },
      {
        [styles['navbar__item--about--active']]: (isAbout || isFaq) && isActive,
      },
      { [styles['navbar__item--faq']]: isFaq },
      className,
    );

  return (
    <section className={styles.navbar}>
      <div className={styles.navbar__left}>
        {pathname === Path.HomeAI ? (
          <NavLink to={Path.HomeAI} className={getActiveLink}>
            <span className={styles.navbar__name}>HomeAI</span>
          </NavLink>
        ) : (
          <NavLink to={Path.Home} className={getActiveLink}>
            <span className={styles.navbar__name}>Home</span>
          </NavLink>
        )}
        {navLinks.map(({ path, label }) => (
          <NavLink key={path} to={path} className={getActiveLink}>
            <span className={styles.navbar__name}>{label}</span>
          </NavLink>
        ))}
      </div>

      <div className={styles.navbar__right}></div>
    </section>
  );
};
