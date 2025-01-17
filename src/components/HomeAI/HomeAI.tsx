import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomeAI.module.scss';
import arrow from '../../images/icons/arrow_left.svg';
import { Path } from '../../utils/constants';

export const HomeAI = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleHomePage = () => {
    navigate(Path.Home);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
    if (error) {
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (query.trim()) {
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('response', JSON.stringify(data));
          navigate(Path.Response);
        })
        .catch(() => {
          setError('Something went wrong!');
        });
    }
  };

  return (
    <div className={styles.home}>
      <section className={styles.home__nav}>
        <div className={styles['home__right-side']}>
          <div className={styles.home__empty}></div>
          <div className={styles['home__footer-right']}>
            <button className={styles['home__arrow-button']}>
              <img
                src={arrow}
                alt={arrow}
                className={styles.home__img}
                onClick={handleHomePage}
              />
            </button>
            <h3 className={styles['home__question-right']}>
              Prefer The Regular Search? No Problem, Just Drag The Arrow!
            </h3>
          </div>
        </div>
        <div className={styles['home__left-side']}>
          <div className={styles.home__content}>
            <h2 className={styles.home__title}>
              Tell Us How You’d Like to Help <br />
              And We’ll Find the Right <br />
              Opportunity
            </h2>
            <p className={styles.home__text}>
              Tell us what kind of cause you’d like to support,if you want to do
              it financially or through volunteering, where and when.
            </p>
          </div>
          <div className={styles.home__footer}>
            <form onSubmit={handleSubmit}>
              <textarea
                value={query}
                onChange={handleChange}
                className={styles.home__input}
                placeholder="Tell about your submission"
                maxLength={600}
                rows={4}
              />
              <div className={styles.home__line}></div>
              <div className={styles['home__button-shell']}>
                <button className={styles.home__button} type="submit">
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
