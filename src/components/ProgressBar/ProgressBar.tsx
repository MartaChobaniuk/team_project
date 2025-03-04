import React from 'react';
import styles from './ProgressBar.module.scss';
import cn from 'classnames';

type Props = {
  target: number | string;
  currentProgress: number | string;
  opportunityType: string;
  assistanceType: string;
};

export const ProgressBar: React.FC<Props> = ({
  target,
  currentProgress,
  opportunityType,
  assistanceType,
}) => {
  const percentage = (Number(currentProgress) / Number(target)) * 100;

  return (
    <div>
      <div className={styles['progress-bar']}>
        <div
          className={cn(styles['progress-bar__filled'], {
            [styles['progress-bar__filled--yellow']]:
              assistanceType === 'VOLUNTEERING',
            [styles['progress-bar__filled--blue']]:
              assistanceType === 'DONATION',
          })}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className={styles['progress-bar__text']}>
        {opportunityType === 'WISHES'
          ? `${currentProgress} ₴ collected`
          : `${currentProgress} participants`}
      </p>
    </div>
  );
};
