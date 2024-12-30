import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { StoriesPage } from './pages/StoriesPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactPage } from './pages/ContactPage';
import { SignUpPage } from './pages/SignUpPage';
import { Path } from './utils/constants';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomeAIPage } from './pages/HomeAIPage';
import { ResponsePage } from './pages/ResponsePage';
import { MenuPage } from './pages/MenuPage';
import { LogInPage } from './pages/LogInPage';
import { FaqPage } from './pages/FaqPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path={Path.Home} element={<App />}>
        <Route index element={<HomePage />} />
        <Route path={Path.HomeAI} element={<HomeAIPage />} />
        <Route path={Path.Response} element={<ResponsePage />} />

        <Route path={Path.Stories} element={<StoriesPage />} />

        <Route path={Path.About}>
          <Route index element={<AboutUsPage />} />
          <Route path={Path.Faq} element={<FaqPage />} />
        </Route>

        <Route path={Path.Contact} element={<ContactPage />} />

        <Route path={Path.SignUp} element={<SignUpPage />} />
        <Route path={Path.LogIn} element={<LogInPage />} />

        <Route path={Path.Menu} element={<MenuPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
