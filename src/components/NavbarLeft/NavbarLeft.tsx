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
  const isHomeAI = pathname === Path.HomeAI;
  const isSignUp = pathname === Path.SignUp;

  const navLinks = [
    { path: Path.Stories, label: 'Success Stories' },
    { path: Path.About, label: 'About Us' },
    { path: Path.Contact, label: 'Contact' },
  ];

  const getActiveLink = ({ isActive }: { isActive: boolean }) =>
    cn(
      styles.navbar__item,
      { [styles['navbar__item--light']]: isHomeAI },
      { [styles['navbar__item--active']]: isActive },
      { [styles['navbar__item--light--active']]: isHomeAI && isActive },
      { [styles['navbar__item--sign']]: isSignUp },
      className,
    );

  return (
    <section className={styles.navbar}>
      <div className={styles.navbar__left}>
        {pathname === Path.HomeAI ? (
          <NavLink to={Path.HomeAI} className={getActiveLink}>
            <span
              className={cn(styles.navbar__name, {
                [styles['navbar__name--light']]: isHomeAI,
                [styles['navbar__name--sign']]: isSignUp,
              })}
            >
              HomeAI
            </span>
          </NavLink>
        ) : (
          <NavLink to={Path.Home} className={getActiveLink}>
            <span
              className={cn(styles.navbar__name, {
                [styles['navbar__name--light']]: isHomeAI,
                [styles['navbar__name--sign']]: isSignUp,
              })}
            >
              Home
            </span>
          </NavLink>
        )}
        {navLinks.map(({ path, label }) => (
          <NavLink key={path} to={path} className={getActiveLink}>
            <span
              className={cn(styles.navbar__name, {
                [styles['navbar__name--light']]: isHomeAI,
                [styles['navbar__name--sign']]: isSignUp,
              })}
            >
              {label}
            </span>
          </NavLink>
        ))}
      </div>

      <div className={styles.navbar__right}></div>
    </section>
  );
};
