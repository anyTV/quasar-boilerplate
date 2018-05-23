import { merge } from 'lodash-es';
import resources from 'src/i18n';

const i18nextEnv = process.env.I18NEXT;
const lookupKey = 'lang';

const i18nextOptions = {
  resources,
  lng: 'en',
  preload: ['en'],
  fallbackLng: 'en',
  ns: ['index'],
  defaultNS: 'index',
  initImmediate: false, // set to false to prevent displaying keys while rendering the page
  returnNull: false,
  returnEmptyString: false,
  returnObjects: false,
  debug: true,

  // i18next-browser-languagedetector options
  detection: {
    order: ['querystring', 'localStorage', 'cookie', 'navigator'],
    lookupQuerystring: lookupKey,
    lookupCookie: lookupKey,
    lookupLocalStorage: lookupKey,
    caches: ['localStorage', 'cookie']
  }
};

export default merge(i18nextOptions, i18nextEnv);
