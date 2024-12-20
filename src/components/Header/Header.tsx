import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { NavbarLeft } from '../NavbarLeft';
import { Logo } from '../Logo';
import { Path } from '../../utils/constants';
import cross_white from '../../images/icons/cross_white.svg';
import burger_white from '../../images/icons/menu_light.svg';
import { NavbarRight } from '../NavbarRight';

export const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.style.overflow = openMenu ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [openMenu]);

  useEffect(() => {
    if (pathname === Path.Menu) {
      setOpenMenu(true);
    } else if (openMenu) {
      setOpenMenu(false);
    }
  }, [pathname, openMenu]);

  const handleOpenMenu = () => {
    setOpenMenu(true);
    navigate(Path.Menu);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
    navigate(-1);
  };

  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <Logo className={styles.header__logo} />
        <NavbarLeft className={styles['header__navbar--left']} />
      </div>

      <div className={styles['header__right--mobile']}>
        <button className={styles.header__lang}>
          <span className={styles['header__lang-name']}>ENG</span>
        </button>
        <button
          onClick={openMenu ? handleCloseMenu : handleOpenMenu}
          className={styles.header__button}
        >
          <img
            src={openMenu ? cross_white : burger_white}
            alt={openMenu ? 'close' : 'menu'}
            className={styles.header__img}
          />
        </button>
      </div>

      <div className={styles.header__right}>
        <NavbarRight />
      </div>
    </div>
  );
};
