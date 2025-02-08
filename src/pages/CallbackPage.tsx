import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const CallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      navigate(`/profile/info?code=${code}`, { replace: true });
    }
  }, [navigate]);

  return <p>Redirecting...</p>;
};
