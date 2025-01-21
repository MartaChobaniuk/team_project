import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import styles from './Header.module.scss';
import { NavbarLeft } from '../NavbarLeft';
import { Logo } from '../Logo';
import { Path } from '../../utils/constants';
import { NavbarRight } from '../NavbarRight';
import menu_white from '../../images/icons/menu_white_bg.svg';
import cross_white from '../../images/icons/cross_white_bg.svg';
import { usePathChecker } from '../../helpers/usePathChecker';

export const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { eventId } = useParams();
  const isEventPage = eventId ? pathname.includes(eventId) : false;

  const {
    isHome,
    isHomeAI,
    isSignUp,
    isLogIn,
    isAbout,
    isContact,
    isFaq,
    isExplore,
    isStories,
  } = usePathChecker();

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
            [styles['header__lang--stories']]: isStories,
            [styles['header__lang--event']]: isEventPage,
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
            [styles['header__button--stories']]: isStories,
            [styles['header__button--event']]: isEventPage,
          })}
        >
          <img
            src={openMenu ? cross_white : menu_white}
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
