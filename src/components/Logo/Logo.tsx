import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './Logo.module.scss';
import { Path } from '../../utils/constants';

type Props = {
  className?: string;
};

export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <Link to={Path.Home} className={cn(styles.logo, className)}>
      <p className={styles.logo__text}>THE i change</p>
    </Link>
  );
};
