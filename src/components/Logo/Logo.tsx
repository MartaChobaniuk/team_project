import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import styles from './Logo.module.scss';
import { Path } from '../../utils/constants';

type Props = {
  className?: string;
};

export const Logo: React.FC<Props> = ({ className }) => {
  const { pathname } = useLocation();
  const isHome = pathname === Path.Home;
  const isHomeAI = pathname === Path.HomeAI;
  const isResponse = pathname === Path.Response;
  const isSignUp = pathname === Path.SignUp;
  const isLogIn = pathname === Path.LogIn;
  const isAbout = pathname === Path.About;
  const isContact = pathname === Path.Contact;

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
        })}
      >
        THE i change
      </p>
    </Link>
  );
};
