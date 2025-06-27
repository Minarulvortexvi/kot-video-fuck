import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './i18n/en.json';
import bn from './i18n/bn.json';
import * as serviceWorkerRegistration from './serviceWorker';

i18n.use(initReactI18next).init({
  resources: { en, bn },
  lng: 'en',
  interpolation: { escapeValue: false }
});

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorkerRegistration.register();
