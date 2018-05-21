import VueAnalytics from 'vue-analytics';

export default ({ Vue }) => {
  Vue.use(VueAnalytics, {
    /**
     * Set Google Analytics ID in config/env/production/index.js > GOOGLE_ANALYTICS_ID.
     * Make sure to use JSON.stringify on it to avoid Webpack on processing it as expression.
     */
    id: process.env.GOOGLE_ANALYTICS_ID,
    disableScriptLoader: !process.env.PROD,
  });
}
