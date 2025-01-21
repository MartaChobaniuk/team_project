import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import cn from 'classnames';
import styles from './Logo.module.scss';
import { Path } from '../../utils/constants';
import { usePathChecker } from '../../helpers/usePathChecker';

type Props = {
  className?: string;
};

export const Logo: React.FC<Props> = ({ className }) => {
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

  return (
    <Link to={Path.Home} className={cn(styles.logo, className)}>
      <p
        className={cn(styles.logo__text, {
          [styles['logo__text--home']]: isHome,
          [styles['logo__text--homeAi']]: isHomeAI,
          [styles['logo__text--response']]: isResponse,
          [styles['logo__text--about']]: isAbout,
          [styles['logo__text--sign']]: isSignUp,
          [styles['logo__text--login']]: isLogIn,
          [styles['logo__text--contact']]: isContact,
          [styles['logo__text--faq']]: isFaq,
          [styles['logo__text--explore']]: isExplore,
          [styles['logo__text--stories']]: isStories,
          [styles['logo__text--event']]: isEventPage,
          [styles['logo__text--step-one']]: isStepOne,
          [styles['logo__text--step-two']]: isStepTwo,
          [styles['logo__text--step-three']]: isStepThree,
          [styles['logo__text--profile']]:
            isProfile || isProfileInfo || isActivity || isOpportunities,
        })}
      >
        THE i change
      </p>
    </Link>
  );
};
