import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import Home from './pages/home/Home';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
);
