import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { StoriesPage } from './pages/StoriesPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactPage } from './pages/ContactPage';
import { SignInPage } from './pages/SignInPage';
import { Path } from './utils/constants';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomeAIPage } from './pages/HomeAIPage';
import { ResponsePage } from './pages/ResponsePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path={`${Path.Home}`} element={<App />}>
        <Route index element={<HomePage />} />
        <Route path={`${Path.HomeAI}`} element={<HomeAIPage />} />
        <Route path={`${Path.Response}`} element={<ResponsePage />} />

        <Route path={`${Path.Stories}`} element={<StoriesPage />} />
        <Route path={`${Path.About}`} element={<AboutUsPage />} />
        <Route path={`${Path.Contact}`} element={<ContactPage />} />
        <Route path={`${Path.SignIn}`} element={<SignInPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
