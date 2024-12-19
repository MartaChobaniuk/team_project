import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './index.scss';

import { Root } from './Root';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <GoogleOAuthProvider
    // eslint-disable-next-line max-len
    clientId="945488249171-fal49mf8s0684eo0l1ke4sj1lp5bss3p.apps.googleusercontent.com"
  >
    <Root />
  </GoogleOAuthProvider>,
);
