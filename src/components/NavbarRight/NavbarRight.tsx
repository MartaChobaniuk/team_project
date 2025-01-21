import React from 'react';
import cn from 'classnames';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import styles from './NavbarRight.module.scss';
import { Path } from '../../utils/constants';
import user_white from '../../images/icons/account_white.svg';
import user_black from '../../images/icons/account_black.svg';
import { usePathChecker } from '../../helpers/usePathChecker';

type Props = {
  className?: string;
};

export const NavbarRight: React.FC<Props> = ({ className }) => {
  const { pathname } = useLocation();
  const { eventId } = useParams();
  const isEventPage = eventId ? pathname.includes(eventId) : false;

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
    isStories,
    isStepOne,
    isStepTwo,
    isStepThree,
  } = usePathChecker();

  const getActiveLink = ({ isActive }: { isActive: boolean }) =>
    cn(
      styles.navbar__item,
      { [styles['navbar__item--active']]: isActive },
      { [styles['navbar__item--home']]: isHome },
      { [styles['navbar__item--homeAi']]: isHomeAI },
      { [styles['navbar__item--response']]: isResponse },
      { [styles['navbar__item--about']]: isAbout },
      { [styles['navbar__item--faq']]: isFaq },
      { [styles['navbar__item--sign']]: isSignUp },
      { [styles['navbar__item--sign--active']]: isSignUp && isActive },
      { [styles['navbar__item--login']]: isLogIn },
      { [styles['navbar__item--login--active']]: isLogIn && isActive },
      { [styles['navbar__item--contact']]: isContact },
      { [styles['navbar__item--explore']]: isExplore },
      { [styles['navbar__item--stories']]: isStories },
      { [styles['navbar__item--event']]: isEventPage },
      className,
    );

  return (
    <section className={styles.navbar}>
      <div className={styles.navbar__left}></div>

      <div className={styles.navbar__right}>
        <button
          className={cn(styles.navbar__lang, {
            [styles['navbar__lang--home']]: isHome,
            [styles['navbar__lang--homeAi']]: isHomeAI,
            [styles['navbar__lang--response']]: isResponse,
            [styles['navbar__lang--about']]: isAbout,
            [styles['navbar__lang--sign']]: isSignUp,
            [styles['navbar__lang--login']]: isLogIn,
            [styles['navbar__lang--faq']]: isFaq,
            [styles['navbar__lang--contact']]: isContact,
            [styles['navbar__lang--explore']]: isExplore,
            [styles['navbar__lang--stories']]: isStories,
            [styles['navbar__lang--event']]: isEventPage,
            [styles['navbar__lang--step-one']]: isStepOne,
            [styles['navbar__lang--step-two']]: isStepTwo,
            [styles['navbar__lang--step-three']]: isStepThree,
            [styles['navbar__lang--profile']]:
              isProfile || isProfileInfo || isActivity || isOpportunities,
          })}
        >
          <span className={styles['navbar__lang-name']}>ENG</span>
        </button>

        {/* eslint-disable-next-line */}
        {(isLogIn || isHome || isHomeAI || isResponse || isAbout || isFaq || isContact || isExplore || isStories || isEventPage) && (
          <NavLink to={Path.LogIn} className={getActiveLink}>
            <img
              src={isHome || isAbout ? user_white : user_black}
              alt="user"
              className={cn(styles.navbar__img, {
                [styles['navbar__img--dark']]:
                  isHomeAI ||
                  isResponse ||
                  isSignUp ||
                  isLogIn ||
                  isContact ||
                  isExplore ||
                  isStories ||
                  isEventPage,
              })}
            />
            <span className={styles.navbar__name}>Log In</span>
          </NavLink>
        )}

        {isSignUp && (
          <NavLink to={Path.SignUp} className={getActiveLink}>
            <img
              src={isHome || isAbout || isFaq ? user_white : user_black}
              alt="user"
              className={cn(styles.navbar__img, {
                [styles['navbar__img--dark']]:
                  isHomeAI ||
                  isResponse ||
                  isSignUp ||
                  isLogIn ||
                  isContact ||
                  isExplore,
              })}
            />
            <span className={styles.navbar__name}>Sign Up</span>
          </NavLink>
        )}
        {(isProfile || isProfileInfo || isActivity || isOpportunities) && (
          <NavLink
            to={Path.Profile}
            className={({ isActive }: { isActive: boolean }) =>
              cn(styles.navbar__profile, {
                [styles['navbar__profile--active']]:
                  (isActive && isProfile) ||
                  (isActive && isProfileInfo) ||
                  (isActive && isActivity) ||
                  (isActive && isOpportunities),
              })
            }
          >
            <img src={user_white} alt="user" className={styles.navbar__img} />
            <span className={styles.navbar__name}>Profile</span>
          </NavLink>
        )}
        {/* eslint-disable-next-line */}
        {(isStepOne || isStepTwo || isStepThree) && (
          <NavLink
            to={Path.Profile}
            className={({ isActive }: { isActive: boolean }) =>
              cn(styles.navbar__step, {
                [styles['navbar__step--active']]:
                  (isActive && isStepOne) ||
                  (isActive && isStepTwo) ||
                  (isActive && isStepThree),
              })
            }
          >
            <img
              src={user_black}
              alt="user"
              className={styles['navbar__img--dark']}
            />
            <span className={styles.navbar__name}>Profile</span>
          </NavLink>
        )}
      </div>
    </section>
  );
};
