import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import styles from './Header.module.scss';
import { NavbarLeft } from '../NavbarLeft';
import { NavbarRight } from '../NavbarRight';
import { Logo } from '../Logo';
import { Path } from '../../utils/constants';
import cross_white from '../../images/icons/cross_white.svg';
import burger_white from '../../images/icons/menu_light.svg';
import burger_black from '../../images/icons/menu_dark.svg';

export const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHomeAI = pathname === Path.HomeAI;

  useEffect(() => {
    document.body.style.overflow = openMenu ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [openMenu]);

  useEffect(() => {
    if (pathname !== Path.Menu && openMenu) {
      setOpenMenu(false);
      document.body.style.overflow = '';
    }
  }, [pathname, openMenu]);

  const handleOpenMenu = () => {
    setOpenMenu(true);
    navigate(Path.Menu);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
    navigate(Path.Home);
  };

  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <Logo className={styles.header__logo} />
        <NavbarLeft className={styles['header__navbar--left']} />
      </div>

      <div className={styles.header__right}>
        <NavbarRight className={styles['header__navbar--right']} />
        {openMenu ? (
          <button
            onClick={handleCloseMenu}
            className={cn(styles.header__button, {
              [styles['header__button--light']]: isHomeAI,
            })}
          >
            <img src={cross_white} alt="cross" className={styles.header__img} />
          </button>
        ) : (
          <button
            onClick={handleOpenMenu}
            className={cn(styles.header__button, {
              [styles['header__button--light']]: isHomeAI,
            })}
          >
            <img
              src={isHomeAI ? burger_black : burger_white}
              alt="menu"
              className={styles.header__img}
            />
          </button>
        )}
      </div>
    </div>
  );
};
