import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './Logo.module.scss';
import { Path } from '../../utils/constants';
import { usePathChecker } from '../../helpers/usePathChecker';

type Props = {
  className?: string;
};

export const Logo: React.FC<Props> = ({ className }) => {
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
          [styles['logo__text--profile']]:
            isProfile || isProfileInfo || isActivity || isOpportunities,
        })}
      >
        THE i change
      </p>
    </Link>
  );
};
