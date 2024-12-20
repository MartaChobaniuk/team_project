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

  const navLinks = [
    { path: Path.Stories, label: 'Success Stories' },
    { path: Path.About, label: 'About Us' },
    { path: Path.Contact, label: 'Contact' },
  ];

  const getActiveLink = ({ isActive }: { isActive: boolean }) =>
    cn(
      styles.navbar__item,
      { [styles['navbar__item--active']]: isActive },
      { [styles['navbar__item--light-bg']]: isHomeAI || isSignUp },
      {
        [styles['navbar__item--light-bg--active']]:
          (isActive && isHomeAI) || (isSignUp && isActive),
      },
      { [styles['navbar__item--dark-bg']]: isHome || isResponse },
      {
        [styles['navbar__item--dark-bg--active']]:
          (isActive && isHome) || (isActive && isResponse),
      },
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
