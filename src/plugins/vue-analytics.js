import VueAnalytics from 'vue-analytics';
import router from 'src/router';

const PROD = process.env.PROD;
/**
 * Set Google Analytics ID in src/config/env/<env>/index.js > GOOGLE_ANALYTICS_ID.
 */
const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID;

export default ({ Vue }) => {
  Vue.use(VueAnalytics, {
    id: GOOGLE_ANALYTICS_ID,
    router,
    autoTracking: {
      transformQueryString: false,
      skipSamePath: true,
      exception: true,
      exceptionLogs: false,
    },
    debug: {
      sendHitTask: PROD,
      enabled: !PROD,
    }
  });
}
