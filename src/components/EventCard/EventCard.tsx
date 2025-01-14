import React from 'react';
import styles from './EventCard.module.scss';
import cn from 'classnames';
import { EventType } from '../../types/EventType';
import image from '../../images/images.jpg';
import { ProgressBar } from '../ProgressBar';
import { Link } from 'react-router-dom';

type Props = {
  event: EventType;
};

export const EventCard: React.FC<Props> = ({ event }) => {
  return (
    <Link to={`/explore/${event.id}`} className={styles.event}>
      <div className={styles['event__container-img']}>
        <img src={image} alt="Event" className={styles.event__img} />
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
        goal={event.goal}
        currentProgress={event.currentProgress}
        opportunityType={event.opportunityType}
        assistanceType={event.assistanceType}
      />
      <div className={styles.event__types}>
        <p>{event.categoryName}</p>
      </div>
      <div className={styles.event__details}>
        <p>{event.location}</p> /
        <p>{new Date(event.date).toLocaleString('uk-UA')}</p>
      </div>
    </Link>
  );
};
