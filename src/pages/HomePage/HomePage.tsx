import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Path } from '../../utils/constants';
import { Home } from '../../components/Home';
import { HomeAI } from '../../components/HomeAI';

export const HomePage = () => {
  const [homeAI, setHomeAI] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === Path.HomeAI) {
      setHomeAI(true);
    } else {
      setHomeAI(false);
    }
  }, [pathname]);

  const handleHomeAI = () => {
    setHomeAI(true);
    navigate(Path.HomeAI);
  };

  return (
    <div>
      {!homeAI ? (
        <div>
          <Home handleHomeAI={handleHomeAI} />
        </div>
      ) : (
        <div>
          <HomeAI />
        </div>
      )}
    </div>
  );
};
