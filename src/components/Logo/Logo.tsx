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
  const isHomeAI = pathname === Path.HomeAI;
  const isSignUp = pathname === Path.SignUp;

  return (
    <Link to={Path.Home} className={cn(styles.logo, className)}>
      <p
        className={cn(styles.logo__text, {
          [styles['logo__text--home-ai']]: isHomeAI,
          [styles['logo__text--sign-up']]: isSignUp,
        })}
      >
        THE i change
      </p>
    </Link>
  );
};
