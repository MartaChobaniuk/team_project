import React from 'react';
import styles from './PrimaryButton.module.scss';
import cn from 'classnames';
import { Path } from '../../utils/constants';
import { useLocation } from 'react-router-dom';

type Props = {
  name: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
};

export const PrimaryButton: React.FC<Props> = ({
  name,
  onClick,
  type = 'button',
  disabled = false,
  className,
}) => {
  const { pathname } = useLocation();
  const isLogIn = pathname === Path.LogIn;
  const isSignUp = pathname === Path.SignUp;

  const buttonClasses = cn(styles['primary-button'], className, {
    [styles['primary-button--light']]: isLogIn || isSignUp,
    [styles['primary-button--dark']]: !isLogIn || !isSignUp,
  });

  return (
    <button
      className={buttonClasses}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{name}</span>
    </button>
  );
};
