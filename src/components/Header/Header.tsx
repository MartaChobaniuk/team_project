import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { NavbarLeft } from '../NavbarLeft';
import { Logo } from '../Logo';
import { Path } from '../../utils/constants';
import cross from '../../images/icons/cross_black.svg';
import burger from '../../images/icons/menu_dark.svg';
import { NavbarRight } from '../NavbarRight';
import cn from 'classnames';

export const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === Path.Home;
  const isSignUp = pathname === Path.SignUp;
  const isLogIn = pathname === Path.LogIn;
  const isHomeAI = pathname === Path.HomeAI;
  const isAbout = pathname === Path.About;
  const isContact = pathname === Path.Contact;
  const isFaq = pathname === Path.Faq;
  const isExplore = pathname === Path.Explore;

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
    <div
      className={cn(styles.header, {
        [styles['header--about']]: isAbout,
      })}
    >
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
            [styles['header__lang--home']]: isHome,
            [styles['header__lang--about']]: isAbout,
            [styles['header__lang--contact']]: isContact,
            [styles['header__lang--explore']]: isExplore,
          })}
        >
          <span
            className={cn(styles['header__lang-name'], {
              [styles['header__lang-name--about']]: isAbout,
            })}
          >
            ENG
          </span>
        </button>
        <button
          onClick={openMenu ? handleCloseMenu : handleOpenMenu}
          className={cn(styles.header__button, {
            [styles['header__button--home']]: isHome,
            [styles['header__button--sign']]: isSignUp,
            [styles['header__button--login']]: isLogIn,
            [styles['header__button--homeAi']]: isHomeAI,
            [styles['header__button--about']]: isAbout,
            [styles['header__button--faq']]: isFaq,
            [styles['header__button--contact']]: isContact,
            [styles['header__button--explore']]: isExplore,
          })}
        >
          <img
            src={openMenu ? cross : burger}
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
