import React from 'react';
import { Link } from 'react-router-dom';
import styles from './EventCard.module.scss';
import cn from 'classnames';
import { EventType } from '../../types/EventType';
import { ProgressBar } from '../ProgressBar';
import { usePathChecker } from '../../helpers/usePathChecker';
import { Path } from '../../utils/constants';

type Props = {
  event: EventType;
};

export const EventCard: React.FC<Props> = ({ event }) => {
  const { isExplore, isVolunteering, isWishes, isDonate } = usePathChecker();

  const basePath = isExplore
    ? Path.Explore
    : isVolunteering
      ? Path.Volunteering
      : isWishes
        ? Path.Wishes
        : isDonate
          ? Path.Donate
          : '';

  return (
    <Link to={`${basePath}/${event.id}`} className={styles.event}>
      <div className={styles['event__container-img']}>
        <img src={event.coverImage} alt="Event" className={styles.event__img} />
        <span
          className={cn(styles['event__help-type'], {
            [styles['event__help-type--yellow']]:
              event.assistanceType === 'VOLUNTEERING',
            [styles['event__help-type--blue']]:
              event.assistanceType === 'DONATION',
          })}
        >
          {event.assistanceType}
        </span>
      </div>
      <h4 className={styles.event__title}>{event.title}</h4>
      <ProgressBar
        goal={event.target}
        currentProgress={event.currentProgress}
        opportunityType={event.opportunityType}
        assistanceType={event.assistanceType}
      />
      <div className={styles.event__types}>
        <p>{event.categoryId}</p>
      </div>
      <div className={styles.event__details}>
        <p>{event.region}</p> /
        <p>
          {event.startingDate},{event.startHour} {event.startMinute}
        </p>
      </div>
    </Link>
  );
};
