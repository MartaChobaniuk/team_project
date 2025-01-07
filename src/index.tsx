import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './index.scss';
import { Root } from './Root';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { EventsProvider } from './store/EventsContex';

Amplify.configure(awsconfig);
createRoot(document.getElementById('root') as HTMLDivElement).render(
  <EventsProvider>
    <Root />
  </EventsProvider>,
);
