import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}
    >
      <AnimatePresence mode="wait">
        {!homeAI ? (
          <motion.div
            key={Path.Home}
            initial={{ x: '100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '-100vw' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          >
            <Home handleHomeAI={handleHomeAI} />
          </motion.div>
        ) : (
          <motion.div
            key={Path.HomeAI}
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '100vw' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          >
            <HomeAI />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
