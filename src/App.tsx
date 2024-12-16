import React from 'react';
import './App.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';

export const App: React.FC = () => {
  return (
    <div className="app">
      <div className="app__container">
        <header className="app__header">
          <Header />
        </header>
        <main className="app__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
