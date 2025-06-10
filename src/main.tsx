import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/scrollbar.css';
import { TranslationProvider } from './contexts/TranslationContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TranslationProvider>
      <App />
    </TranslationProvider>
  </StrictMode>
);
