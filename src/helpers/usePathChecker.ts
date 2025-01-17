import { useLocation } from 'react-router-dom';
import { Path } from '../utils/constants';

export const usePathChecker = () => {
  const { pathname } = useLocation();

  return {
    isHome: pathname === Path.Home,
    isHomeAI: pathname === Path.HomeAI,
    isResponse: pathname === Path.Response,
    isSignUp: pathname === Path.SignUp,
    isLogIn: pathname === Path.LogIn,
    isAbout: pathname === Path.About,
    isFaq: pathname === Path.Faq,
    isContact: pathname === Path.Contact,
    isExplore: pathname === Path.Explore,
    isProfile: pathname === Path.Profile,
    isProfileInfo: pathname === Path.ProfileInfo,
    isActivity: pathname === Path.Activity,
    isOpportunities: pathname === Path.Opportunities,
  };
};
