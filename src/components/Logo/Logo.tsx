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

  return (
    <Link to={Path.Home} className={cn(styles.logo, className)}>
      <p
        className={cn(styles.logo__text, {
          [styles['logo__text--light']]: isHomeAI,
        })}
      >
        THE i change
      </p>
    </Link>
  );
};
