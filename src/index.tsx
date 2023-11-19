import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './app/App';
import {PlayerProvider} from "./shared/context/PlayerContext";

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <PlayerProvider>
      <App />
    </PlayerProvider>
  </React.StrictMode>
);
