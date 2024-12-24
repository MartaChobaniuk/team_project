import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './Menu.module.scss';
import { Path } from '../../utils/constants';
import user from '../../images/icons/account_black.svg';

export const Menu = () => {
  const navLinks = [
    { path: Path.Home, label: 'Home', end: true },
    { path: Path.Stories, label: 'Success Stories' },
    { path: Path.About, label: 'About Us' },
    { path: Path.Contact, label: 'Contact' },
  ];

  const getActiveLink = ({ isActive }: { isActive: boolean }) =>
    cn(styles.menu__item, { [styles['menu__item--active']]: isActive });

  return (
    <section className={styles.menu}>
      <div className={styles.menu__left}>
        {navLinks.map(({ path, label, end }) => (
          <NavLink key={path} to={path} end={end} className={getActiveLink}>
            <span className={styles.menu__name}>{label}</span>
          </NavLink>
        ))}
      </div>
      <div className={styles.menu__right}>
        <NavLink
          className={({ isActive }: { isActive: boolean }) =>
            cn(styles.menu__sign, {
              [styles['menu__sign--active']]: isActive,
            })
          }
          to={Path.SignUp}
        >
          <img src={user} alt="user" className={styles.menu__img} />
          <span className={styles['menu__name--sign']}>Sign Up</span>
        </NavLink>
      </div>
    </section>
  );
};
