import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LeadProvider } from './contexts/LeadContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LeadProvider>
      <App />
    </LeadProvider>
  </StrictMode>
);
