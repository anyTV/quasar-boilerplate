import axios from 'axios';
import qs from 'qs';

const baseAxios = axios.create({
  baseURL: process.env.SERVER_URL,
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'brackets' }),
});

export default baseAxios;
