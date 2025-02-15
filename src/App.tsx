import React from 'react';
import './App.scss';
import cn from 'classnames';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { usePathChecker } from './helpers/usePathChecker';

export const App: React.FC = () => {
  const {
    isExplore,
    isAbout,
    isFaq,
    isHome,
    isVolunteering,
    isWishes,
    isDonate,
    isOpportunities,
  } = usePathChecker();

  return (
    <div className="app">
      <div className="app__container">
        <header
          className={cn('app__header', {
            'app__header--explore': isExplore,
            'app__header--volunt': isVolunteering,
            'app__header--wishes': isWishes,
            'app__header--donate': isDonate,
            'app__header--about': isAbout,
            'app__header--faq': isFaq,
            'app__header--home': isHome,
            'app__header--opport': isOpportunities,
          })}
        >
          <Header />
        </header>
        <main className="app__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
