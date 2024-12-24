import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { NavbarLeft } from '../NavbarLeft';
import { Logo } from '../Logo';
import { Path } from '../../utils/constants';
import cross_white from '../../images/icons/cross_white.svg';
import burger_white from '../../images/icons/menu_light.svg';
import { NavbarRight } from '../NavbarRight';
import cn from 'classnames';

export const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isSignUp = pathname === Path.SignUp;
  const isLogIn = pathname === Path.LogIn;
  const isHomeAI = pathname === Path.HomeAI;

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
        <NavbarLeft className={styles['header__navbar-left']} />
      </div>

      <div className={styles['header__right-mobile']}>
        <button
          className={cn(styles.header__lang, {
            [styles['header__lang--sign']]: isSignUp,
            [styles['header__lang--login']]: isLogIn,
            [styles['header__lang--homeAi']]: isHomeAI,
          })}
        >
          <span className={styles['header__lang-name']}>ENG</span>
        </button>
        <button
          onClick={openMenu ? handleCloseMenu : handleOpenMenu}
          className={cn(styles.header__button, {
            [styles['header__button--sign']]: isSignUp,
            [styles['header__button--login']]: isLogIn,
            [styles['header__button--homeAi']]: isHomeAI,
          })}
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
