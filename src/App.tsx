import React from 'react';
import './App.scss';
import cn from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Path } from './utils/constants';

export const App: React.FC = () => {
  const { pathname } = useLocation();
  const isExplore = pathname === Path.Explore;
  const isAbout = pathname === Path.About;
  const isFaq = pathname === Path.Faq;

  return (
    <div className="app">
      <div className="app__container">
        <header
          className={cn('app__header', {
            'app__header--explore': isExplore,
            'app__header--about': isAbout,
            'app__header--faq': isFaq,
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
