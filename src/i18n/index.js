import { transform } from 'lodash';

// These resources are used in development
// Production uses i18nextxhrbackend
import en from './en/index.json';

export default transform(
    { en }, // you can add other resources here for testing translations
    (resources, value, key) => resources[key] = { index: value }
);
