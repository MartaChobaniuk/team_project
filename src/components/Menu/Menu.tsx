import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './Menu.module.scss';
import { Path } from '../../utils/constants';
import user_white from '../../images/icons/account_white.svg';

export const Menu = () => {
  const navLinks = [
    { path: Path.Home, label: 'Home' },
    { path: Path.Stories, label: 'Success Stories' },
    { path: Path.About, label: 'About Us' },
    { path: Path.Contact, label: 'Contact' },
  ];

  const getActiveLink = ({ isActive }: { isActive: boolean }) =>
    cn(styles.menu__item, { [styles['menu__item--active']]: isActive });

  return (
    <section className={styles.menu}>
      <div className={styles.menu__left}>
        {navLinks.map(({ path, label }) => (
          <NavLink key={path} to={path} className={getActiveLink}>
            <span className={styles.menu__name}>{label}</span>
          </NavLink>
        ))}
      </div>
      <div className={styles.menu__right}>
        <NavLink className={getActiveLink} to={Path.SignUp}>
          <img src={user_white} alt="user" className={styles.menu__img} />
          <span className={styles.menu__name}>Sign Up</span>
        </NavLink>
      </div>
    </section>
  );
};
