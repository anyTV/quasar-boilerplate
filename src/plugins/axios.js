import axiosHelper from 'src/helpers/axios';

export default ({ Vue }) => {
  Object.defineProperties(Vue.prototype, {
    $axios: {
      get() {
        return axiosHelper;
      }
    },
    $http: {
      get() {
        return axiosHelper;
      }
    }
  });
}
