import React from 'react';
import styles from './ProgressBar.module.scss';

type Props = {
  goal: number;
  currentProgress: number;
  opportunityType: string;
};

export const ProgressBar: React.FC<Props> = ({
  goal,
  currentProgress,
  opportunityType,
}) => {
  const percentage = (currentProgress / goal) * 100;

  return (
    <div>
      <div className={styles['progress-bar']}>
        <div
          className={styles['progress-bar__filled']}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className={styles['progress-bar__text']}>
        {opportunityType === 'WISHES'
          ? `${currentProgress} ₴`
          : `${currentProgress} participants`}
      </p>
    </div>
  );
};
