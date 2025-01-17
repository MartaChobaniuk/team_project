import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
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
import { ExploreAllPage } from './pages/ExploreAllPage';
import { EventDetailsPage } from './pages/EventDetailsPage';
import { ProfilePage } from './pages/ProfilePage';
import { ProfileInfoPage } from './pages/ProfileInfoPage';
import { ProfileActivityPage } from './pages/ProfileActivityPage';
import { ProfileOpportunitiesPage } from './pages/ProfileOpportunitiesPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path={Path.Home} element={<App />}>
        <Route index element={<HomePage />} />

        <Route path={Path.Explore}>
          <Route index element={<ExploreAllPage />} />
          <Route path=":eventId" element={<EventDetailsPage />} />
        </Route>

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

        <Route path={Path.Profile}>
          <Route index element={<ProfilePage />} />
          <Route path={Path.ProfileInfo} element={<ProfileInfoPage />} />
          <Route path={Path.Activity} element={<ProfileActivityPage />} />
          <Route
            path={Path.Opportunities}
            element={<ProfileOpportunitiesPage />}
          />
        </Route>

        <Route path={Path.Menu} element={<MenuPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
