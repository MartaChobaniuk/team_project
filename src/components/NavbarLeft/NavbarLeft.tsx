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
      className,
    );

  return (
    <section className={styles.navbar}>
      <div className={styles.navbar__left}>
        {pathname === Path.Home ? (
          <NavLink to={Path.Home} className={getActiveLink}>
            <span
              className={cn(styles.navbar__name, {
                [styles['navbar__name--light']]: isHomeAI,
              })}
            >
              Home
            </span>
          </NavLink>
        ) : (
          <NavLink to={Path.HomeAI} className={getActiveLink}>
            <span
              className={cn(styles.navbar__name, {
                [styles['navbar__name--light']]: isHomeAI,
              })}
            >
              HomeAI
            </span>
          </NavLink>
        )}
        {navLinks.map(({ path, label }) => (
          <NavLink key={path} to={path} className={getActiveLink}>
            <span
              className={cn(styles.navbar__name, {
                [styles['navbar__name--light']]: isHomeAI,
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
