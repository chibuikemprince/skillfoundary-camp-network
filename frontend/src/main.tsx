import React from 'react';
import ReactDOM from 'react-dom/client';
import { CampProvider } from '@campnetwork/origin/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import './index.css';

const envVars = import.meta.env as Record<string, string | undefined>;
const originClientId =
  envVars.VITE_ORIGIN_CLIENT_ID ||
  envVars.REACT_APP_ORIGIN_CLIENT_ID ||
  'camp-demo-client-id';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CampProvider
        clientId={originClientId}
        redirectUri={window.location.origin + '/dashboard'}
      >
        <App />
      </CampProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
