import styles from './Header.module.scss';
import { Navbar } from '../Navbar';
import { Logo } from '../Logo';

export const Header = () => {
  return (
    <div className={styles.header}>
      <Logo className={styles.header__logo} />
      <Navbar className={styles.header__navbar} />
    </div>
  );
};
