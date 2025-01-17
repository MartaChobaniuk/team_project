import React from 'react';
import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './NavbarLeft.module.scss';
import { Path } from '../../utils/constants';
import { usePathChecker } from '../../helpers/usePathChecker';

type Props = {
  className?: string;
};

export const NavbarLeft: React.FC<Props> = ({ className }) => {
  const { pathname } = useLocation();
  const {
    isHome,
    isHomeAI,
    isResponse,
    isSignUp,
    isLogIn,
    isAbout,
    isFaq,
    isContact,
    isExplore,
    isProfile,
    isProfileInfo,
    isActivity,
    isOpportunities,
  } = usePathChecker();

  const navLinks = [
    { path: Path.Stories, label: 'Success Stories' },
    { path: Path.About, label: 'About Us' },
    { path: Path.Contact, label: 'Contact' },
  ];

  const getActiveLink = ({ isActive }: { isActive: boolean }) =>
    cn(
      styles.navbar__item,
      { [styles['navbar__item--active']]: isActive },
      { [styles['navbar__item--home']]: isHome || isExplore },
      {
        [styles['navbar__item--home--active']]:
          (isHome || isExplore) && isActive,
      },
      { [styles['navbar__item--explore']]: isExplore },
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
      { [styles['navbar__item--contact']]: isContact },
      { [styles['navbar__item--contact--active']]: isContact && isActive },
      {
        [styles['navbar__item--profile']]:
          isProfile || isProfileInfo || isActivity || isOpportunities,
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
